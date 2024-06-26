﻿using System.ComponentModel.DataAnnotations;
using System.Text;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using EcoLife.Api.Entities.ORS.Request;
using EcoLife.Api.Entities.ORS.Response;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

using VehicleORS = EcoLife.Api.Entities.ORS.Request.Vehicle;

namespace EcoLife.Api.Controllers
{
    [Route("api/recolections")]
    [Authorize]
    [ApiController]
    public class RecolectionController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly HttpClient _client;

        public RecolectionController(IUnitOfWork uow, IMapper mapper, HttpClient client)
        {
            this._uow = uow;
            this._mapper = mapper;
            this._client = client;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var recolections = await _uow.RecolectionRepository.GetAllWithEntities();
            return Ok(recolections);
        }

        [HttpGet("{recolectionId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int recolectionId)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(recolectionId);
            return Ok(recolection);
        }

        [HttpPost]
        async public Task<IActionResult> PostAsync([FromBody] RecolectionDto recolectionDto)
        {
            var recolection = _mapper.Map<Recolection>(recolectionDto);

            var result = await _uow.RecolectionRepository.AddAndSaveAsync(recolection);

            await OrderContainersRoute(result.Id);

            return Ok(result);
        }

        [HttpDelete("{recolectionId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int recolectionId)
        {
            await _uow.RecolectionRepository.Delete(recolectionId);
            return Ok();
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateAsync([FromBody] Recolection editRecolection)
        {
            var updateOrderRoute = false;

            var existingRecolection = await _uow.RecolectionRepository.GetByIdAsync(editRecolection.Id);

            if(editRecolection.WasteCenterId != existingRecolection.WasteCenterId || editRecolection.VehicleCenterId != existingRecolection.VehicleCenterId)
            {
                updateOrderRoute = true;
            }

            _uow.RecolectionRepository.Detach(existingRecolection);

            var result = await _uow.RecolectionRepository.Update(editRecolection);

            if (updateOrderRoute)
            {
                await OrderContainersRoute(editRecolection.Id);
            }

            return Ok(result);
        }

        private async Task OrderContainersRoute(int recolectionId)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdWithEntities(recolectionId);

            var jobs = new List<Job>();

            foreach (var item in recolection.Route!.RouteContainers) 
            { 
                var job = new Job { id = item.Container!.Id, delivery = new[] { 1 }, location = new[] { item.Container!.Longitude, item.Container!.Latitude } };
                jobs.Add(job);
            }

            var vehicles = new List<VehicleORS>
            {
                new VehicleORS 
                { 
                    id = 0, 
                    profile = "driving-car", 
                    start = new[] { recolection.VehicleCenter!.Longitude, recolection.VehicleCenter.Latitude },
                    end = new[] { recolection.WasteCenter!.Longitude, recolection.WasteCenter.Latitude },
                    capacity = new[] { 9999 } 
                }
            };

            var optimizationRequest = new OptimizationRequest
            {
                jobs = jobs,
                vehicles = vehicles
            };

            var json = JsonConvert.SerializeObject(optimizationRequest);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _client.DefaultRequestHeaders.Add("Authorization", "5b3ce3597851110001cf62484198a445736d42b69739f9f425f8d074");
            _client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/geo+json"));
            _client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/gpx+xml"));
            _client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("img/png"));

            var response = await _client.PostAsync("https://api.openrouteservice.org/optimization", content);

            Console.WriteLine(response);

            var responseString = await response.Content.ReadAsStringAsync();

            Console.WriteLine(responseString);

            var optimizationResponse = JsonConvert.DeserializeObject<OptimizationResponse>(responseString);

            List<int> jobOrder = new();

            foreach (var step in optimizationResponse!.routes[0].steps)
            {
                if (step.type == "job" && step.job.HasValue)
                {
                    jobOrder.Add(step.job.Value);
                }
            }

            int order = 0;

            foreach (var jobId in jobOrder)
            {
                var container = recolection.Route.RouteContainers.FirstOrDefault(c => c.ContainerId == jobId);
                if (container != null)
                {
                    container.Order = order++;
                }
            }

            await _uow.RecolectionRepository.SaveChangesAsync();
        }
    }
}
