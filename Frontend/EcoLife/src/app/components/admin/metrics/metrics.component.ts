import { Component, OnInit } from '@angular/core';
import { DamageService, RecolectionService } from '../../../services';
import { DamageStatsModel, PrimeSelectOptionModel, RecolectionCurrentStats, RecolectionHistoricStats, RecolectionTopStats } from '../../../models';
import { MatSelectChange } from '@angular/material/select';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent implements OnInit {
  actualDate = new Date();
  defaultOption: string = 'All';
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
  selectedDamagedPeriod: PrimeSelectOptionModel | undefined;
  selectedRecolectionPeriod: PrimeSelectOptionModel | undefined;
  selectedTopPeriod: PrimeSelectOptionModel | undefined;
  periodOptions: PrimeSelectOptionModel[] = [
    { code: 'Weekly', label: 'Semanal' },
    { code: 'Monthly', label: 'Mensual' },
    { code: 'Quarterly', label: 'Trimestral' }
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

  onDamagePeriodChange(event: DropdownChangeEvent) {
    this.selectedDamagedPeriod = event.value;
    this.getDamagedPeriodStats();
  }

  onRecolectionPeriodChange(event: DropdownChangeEvent) {
    this.selectedRecolectionPeriod = event.value;
    this.getRecolectionPeriodStats();
  }
  
  onTopPeriodChange(event: DropdownChangeEvent) {
    this.selectedTopPeriod = event.value;
    this.getTopRecolectionStats();
  }

  getDamagedPeriodStats(): void {
    this.damagesLoading = true;
    this.damageService.getByType(this.selectedDamagedPeriod?.code ?? this.defaultOption)
      .subscribe((response: DamageStatsModel) => {
        this.damageStats = response;
        this.damagesLoading = false;
    });
  }

  getRecolectionPeriodStats(): void {
    this.historicRecolectionLoading = true;
    this.recolectionService.getHistoricStats(this.selectedRecolectionPeriod?.code ?? this.defaultOption)
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
    this.recolectionService.getTopStats(this.selectedTopPeriod?.code ?? this.defaultOption)
      .subscribe((response: RecolectionTopStats) => {
        this. recolectionTopStats = response;
        this.topRecolectionLoading = false;
    });
  }
}
