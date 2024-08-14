import { Component, OnInit } from '@angular/core';
import { DamageService, RecolectionService } from '../../../services';
import { DamageStatsModel, PrimeSelectOptionModel, RecolectionCurrentStats, RecolectionHistoricStats, RecolectionTopStats } from '../../../models';
import { DropdownChangeEvent } from 'primeng/dropdown';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';

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
  damageBarData: any;
  recolectionPieData: any;
  damagePieData: any;
  barOptions: any;
  pieOptions: any;
  plugins: any;
  isDownloading: boolean = false;

  constructor(
    private damageService: DamageService,
    private recolectionService: RecolectionService) { }

  ngOnInit(): void {
    this.getDamagedPeriodStats();
    this.getRecolectionPeriodStats();
    this.getCurrentRecolectionStats();
    this.getTopRecolectionStats();
    this.initBarOptions();
    this.initPieOptions();
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
        this.initBarChartData(response.labels, response.vehicle.labelType, response.container.labelType, response.vehicle.counts, response.container.counts, 'damage');
        this.initPieChartData(response.vehicle.labelType, response.container.labelType, this.getVehicleDamagesCount(), this.getContainerDamagesCount(), 'damage');
        this.damagesLoading = false;
    });
  }

  getRecolectionPeriodStats(): void {
    this.historicRecolectionLoading = true;
    this.recolectionService.getHistoricStats(this.selectedRecolectionPeriod?.code ?? this.defaultOption)
      .subscribe((response: RecolectionHistoricStats) => {
        this.recolectionHistoricStats = response;
        this.initBarChartData(response.labels, response.finalized.labelType, response.canceled.labelType, response.finalized.counts, response.canceled.counts, 'recolection');
        this.initPieChartData(response.finalized.labelType, response.canceled.labelType, this.getFinalizedCount(), this.getCanceledCount(), 'recolection');
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

  getVehicleDamagesCount(): number {
    return this.damageStats.vehicle.counts.reduce((a, b) => a + b, 0);
  }

  getContainerDamagesCount(): number {
    return this.damageStats.container.counts.reduce((a, b) => a + b, 0);
  }

  initBarChartData(labels: string[], firstLabelType: string, secondLabelType: string, firstCounts: number[], secondCounts: number[], type: 'recolection' | 'damage'): void {
    const documentStyle = getComputedStyle(document.documentElement);

    const barData = {
      labels: labels,
      datasets: [
        {
          label: firstLabelType,
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: firstCounts
        },
        {
          label: secondLabelType,
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: secondCounts
        }
      ]
    };

    this[`${type}BarData`] = barData;
  } 

  initBarOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barOptions = {
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
  };

  initPieChartData(firstLabelType: string, secondLabelType: string, firstCount: number, secondCount: number, type: 'recolection' | 'damage'): void {
    const documentStyle = getComputedStyle(document.documentElement);

    const pieData = {
      labels: [firstLabelType, secondLabelType],
      datasets: [
        {
          data: [firstCount, secondCount],
          backgroundColor: [documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--blue-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--blue-500')]
        }
      ]
    };

    this[`${type}PieData`] = pieData;
  }

  initPieOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieOptions = {
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

  downloadPDF(): void {
    const element = document.getElementById('container');

    if (element) {
      this.isDownloading = true;

      this.captureElementAsCanvas(element)
        .subscribe(canvas => {
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const x = 0;
          const y = 0;

          pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

          const today = new Date();
          const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
          const title = `Metricas_${formattedDate}`;

          pdf.save(`${title}.pdf`);
        }
      ).add(() => this.isDownloading = false);
    }
  }

  captureElementAsCanvas(element: HTMLElement): Observable<HTMLCanvasElement> {
    return new Observable<HTMLCanvasElement>(observer => {
      html2canvas(element, {
        scale: 1,
        onclone: (clonedDoc) => {
          const downloadButton = clonedDoc.getElementById('downloadButton');
          if (downloadButton) {
            downloadButton.style.visibility = 'hidden';
          }
        },
      }).then(canvas => {
        observer.next(canvas);
        observer.complete();
      }).catch(error => { 
        observer.error(error)
      });
    });
  }
}
