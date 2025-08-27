import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericChartComponent } from '../generic-chart-component/generic-chart-component';
import { MembersListComponent } from '../members-list-component/members-list-component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GenericChartComponent, MembersListComponent],
  templateUrl: './chart-component.html',
})
export class ChartComponent {}
