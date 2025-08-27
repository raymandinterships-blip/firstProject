import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-generic-chart-component',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './generic-chart-component.html',
  styleUrl: './generic-chart-component.css',
})
export class GenericChartComponent implements OnInit {
  @Input() endpoint!: string;
  @Input() body: any = {};
  @Input() chartTitle: string = 'نمودار';
  @Input() labelKeys: string[] = [];
  @Input() datasetLabels: string[] = [];
  @Input() colors: string[] = [];

  public barChartType: 'bar' = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: this.chartTitle },
    },
  };
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.loadData();
    setInterval(() => this.loadData(), 100000);
  }
  loadData(): void {
    this.httpService.post<any>(this.endpoint, this.body).subscribe({
      next: (data) => {
        const items: any[] = data?.result?.queues || data?.result?.data?.queues || [];
        this.barChartData = {
          labels: items.map((i) => i.queue_name || 'نامشخص'),
          datasets: this.labelKeys.map((key, index) => ({
            data: items.map((i) => i[key] || 0),
            label: this.datasetLabels[index] || key,
            backgroundColor: this.colors[index] || this.getRandomColor(),
          })),
        };
      },
      error: (err) => {
        console.error('خطا در دریافت داده ها:', err);
        this.barChartData = { labels: [], datasets: [] };
      },
    });
  }

  private getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
