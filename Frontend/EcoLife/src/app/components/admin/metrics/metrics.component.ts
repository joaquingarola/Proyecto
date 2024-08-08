import { Component, OnInit } from '@angular/core';
import { DamageService } from '../../../services';
import { StatsModel } from '../../../models';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent implements OnInit {
  damagesLoading = false;
  stats: StatsModel;
  selectedPeriod: string = 'All';
  periodOptions = [
    { value: 'Weekly', viewValue: 'Semanal' },
    { value: 'Monthly', viewValue: 'Mensual' },
    { value: 'Quarterly', viewValue: 'Trimestral' },
    { value: 'All', viewValue: 'Todo' }
  ];

  constructor(private damageService: DamageService) { }

  ngOnInit(): void {
    this.getPeriodStats();
  }

  onPeriodChange(event: MatSelectChange) {
    this.selectedPeriod = event.value;
    this.getPeriodStats();
  }

  getPeriodStats(): void {
    this.damagesLoading = true;
    this.damageService.getByType(this.selectedPeriod)
      .subscribe((response: StatsModel) => {
        this.stats = response;
        this.damagesLoading = false;
    });
  }
}
