import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { GenericChartComponent } from '../generic-chart-component/generic-chart-component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GenericChartComponent],
  templateUrl: './chart-component.html',
})
export class ChartComponent {}
