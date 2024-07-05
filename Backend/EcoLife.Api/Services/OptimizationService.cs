using System.Text;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities.ORS.Request;
using EcoLife.Api.Entities.ORS.Response;
using EcoLife.Api.Services.Interfaces;

using Newtonsoft.Json;

using VehicleORS = EcoLife.Api.Entities.ORS.Request.Vehicle;

namespace EcoLife.Api.Services
{
    public class OptimizationService : IOptimizationService
    {
        private readonly IUnitOfWork _uow;
        private readonly HttpClient _client;
        public OptimizationService(IUnitOfWork uow, HttpClient client)
        {
            this._uow = uow;
            this._client = client;
        }

        public async Task OrderContainersRoute(int recolectionId)
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

            var responseString = await response.Content.ReadAsStringAsync();

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
