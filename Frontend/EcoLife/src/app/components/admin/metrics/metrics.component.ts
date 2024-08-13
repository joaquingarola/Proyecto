import { Component, OnInit } from '@angular/core';
import { DamageService, RecolectionService } from '../../../services';
import { DamageStatsModel, PrimeSelectOptionModel, RecolectionCurrentStats, RecolectionHistoricStats, RecolectionTopStats } from '../../../models';
import { DropdownChangeEvent } from 'primeng/dropdown';
import pluginDataLabels from 'chartjs-plugin-datalabels';

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
    { code: 'Weekly', label: 'Últimos 7 días' },
    { code: 'Monthly', label: 'Últimos 30 días' },
    { code: 'Quarterly', label: 'Últimos 90 días' }
  ];
  recolectionBarData: any;
  recolectionBarOptions: any;
  recolectionPieData: any;
  recolectionPieOptions: any;
  plugins: any;

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

    this.recolectionBarData = {
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

    this.recolectionBarOptions = {
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
            color: textColorSecondary,
            callback: function(value: number) {
              return Number.isInteger(value) ? value : null;
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.getPieConfig();
  } 

  getPieConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.recolectionPieData = {
      labels: [this.recolectionHistoricStats.canceled.labelType, this.recolectionHistoricStats.finalized.labelType],
      datasets: [
        {
          data: [this.getCanceledCount(), this.getFinalizedCount()],
          backgroundColor: [documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--blue-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--blue-500')]
        }
      ]
    };

    this.recolectionPieOptions = {
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          }
        },
        datalabels: {
          formatter: (value: number, ctx: any) => {
            const total = ctx.chart.data.datasets[0].data.reduce((sum: number, data: number) => sum + data, 0);
            const percentage = (value * 100 / total).toFixed(2) + '%';
            return percentage;
          },
          color: '#fff', 
          font: {
            weight: 'bold',
            size: 14
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem: any) {
              const dataset = tooltipItem.dataset;
              const total = dataset.data.reduce((sum: number, value: number) => sum + value, 0);
              const currentValue = dataset.data[tooltipItem.dataIndex];
              const percentage = ((currentValue / total) * 100).toFixed(2);
    
              return `${percentage}%`;
            }
          }
        }
      }
    };

    this.plugins = [pluginDataLabels];
  }
}
