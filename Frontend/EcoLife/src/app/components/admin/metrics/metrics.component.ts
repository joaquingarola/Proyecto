import { Component, OnInit } from '@angular/core';
import { DamageService, RecolectionService } from '../../../services';
import { DamageStatsModel, RecolectionCurrentStats, RecolectionHistoricStats } from '../../../models';
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
  damageStats: DamageStatsModel;
  recolectionHistoricStats: RecolectionHistoricStats;
  recolectionCurrentStats: RecolectionCurrentStats;
  selectedDamagedPeriod: string = 'All';
  selectedRecolectionPeriod: string = 'All';
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
  }

  onDamagePeriodChange(event: MatSelectChange) {
    this.selectedDamagedPeriod = event.value;
    this.getDamagedPeriodStats();
  }

  onRecolectionPeriodChange(event: MatSelectChange) {
    this.selectedRecolectionPeriod = event.value;
    this.getRecolectionPeriodStats();
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
}
