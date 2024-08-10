import { Component, Input } from '@angular/core';

@Component({
  selector: 'metric-card',
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss'
})
export class MetricCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() description: string;
  @Input() icon: string;
}
