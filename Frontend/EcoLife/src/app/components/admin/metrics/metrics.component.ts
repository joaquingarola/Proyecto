import { Component, OnInit } from '@angular/core';
import { DamageService, RecolectionService } from '../../../services';
import { DamageStatsModel, RecolectionCurrentStats, RecolectionHistoricStats, RecolectionTopStats } from '../../../models';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent implements OnInit {
  damagesLoading = false;
  currentRecolectionLoading = false;
  historicRecolectionLoading = false;
  topRecolectionLoading = false;
  damageStats: DamageStatsModel;
  recolectionHistoricStats: RecolectionHistoricStats;
  recolectionCurrentStats: RecolectionCurrentStats;
  recolectionTopStats: RecolectionTopStats = {
    topVehicles: [],
    topEmployees: []
  };
  selectedDamagedPeriod: string = 'All';
  selectedRecolectionPeriod: string = 'All';
  selectedTopPeriod: string = 'All';
  periodOptions = [
    { value: 'Weekly', viewValue: 'Semanal' },
    { value: 'Monthly', viewValue: 'Mensual' },
    { value: 'Quarterly', viewValue: 'Trimestral' },
    { value: 'All', viewValue: 'Todo' }
  ];

  constructor(
    private damageService: DamageService,
    private recolectionService: RecolectionService) { }

  ngOnInit(): void {
    this.getDamagedPeriodStats();
    this.getRecolectionPeriodStats();
    this.getCurrentRecolectionStats();
    this.getTopRecolectionStats();
  }

  onDamagePeriodChange(event: MatSelectChange) {
    this.selectedDamagedPeriod = event.value;
    this.getDamagedPeriodStats();
  }

  onRecolectionPeriodChange(event: MatSelectChange) {
    this.selectedRecolectionPeriod = event.value;
    this.getRecolectionPeriodStats();
  }
  
  onTopPeriodChange(event: MatSelectChange) {
    this.selectedTopPeriod = event.value;
    this.getTopRecolectionStats();
  }

  getDamagedPeriodStats(): void {
    this.damagesLoading = true;
    this.damageService.getByType(this.selectedDamagedPeriod)
      .subscribe((response: DamageStatsModel) => {
        this.damageStats = response;
        this.damagesLoading = false;
    });
  }

  getRecolectionPeriodStats(): void {
    this.historicRecolectionLoading = true;
    this.recolectionService.getHistoricStats(this.selectedRecolectionPeriod)
      .subscribe((response: RecolectionHistoricStats) => {
        this.recolectionHistoricStats = response;
        this.historicRecolectionLoading = false;
    });
  }

  getCurrentRecolectionStats(): void {
    this.currentRecolectionLoading = true;
    this.recolectionService.getCurrentStats()
      .subscribe((response: RecolectionCurrentStats) => {
        this.recolectionCurrentStats = response;
        this.currentRecolectionLoading = false;
    });
  }

  getTopRecolectionStats(): void {
    this.topRecolectionLoading = true;
    this.recolectionService.getTopStats(this.selectedTopPeriod)
      .subscribe((response: RecolectionTopStats) => {
        this. recolectionTopStats = response;
        this.topRecolectionLoading = false;
    });
  }
}
