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
  data: any;
  options: any;

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
        this.initHistoricRecolectionCharts();
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
        this.recolectionTopStats = response;
        this.topRecolectionLoading = false;
    });
  }

  getFinalizedCount(): number {
    return this.recolectionHistoricStats.finalized.counts.reduce((a, b) => a + b, 0);
  }

  getCanceledCount(): number {
    return this.recolectionHistoricStats.canceled.counts.reduce((a, b) => a + b, 0);
  }

  initHistoricRecolectionCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.recolectionHistoricStats.labels,
      datasets: [
        {
          label: this.recolectionHistoricStats.finalized.labelType,
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.recolectionHistoricStats.finalized.counts
        },
        {
          label: this.recolectionHistoricStats.canceled.labelType,
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.recolectionHistoricStats.canceled.counts
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
              color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
                weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  } 
}
