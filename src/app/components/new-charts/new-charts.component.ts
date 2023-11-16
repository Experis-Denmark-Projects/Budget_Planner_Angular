import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-new-charts',
  templateUrl: './new-charts.component.html',
  styleUrls: ['./new-charts.component.css']
})
export class NewChartsComponent implements OnInit {
  title = 'Antal procent hver kategory fylder fra det total budget ';
  chart: any = [];
  
  @Input() input:{ name: string; totalPrice: number }[] = []

  categories = [
    { name: "Category1", totalPrice: 300 },
    { name: "Category2", totalPrice: 150 },
    { name: "Category3", totalPrice: 150 },
    { name: "Category4", totalPrice: 150 },
    { name: "Category5", totalPrice: 200 },
  ];

  private calculatePercentages(categories: { name: string; totalPrice: number }[]): { name: string; percentage: number }[] {
    const total = categories.reduce((sum, category) => sum + category.totalPrice, 0);
  
    return categories.map(category => ({
      name: category.name,
      percentage: (category.totalPrice / total) * 100
    }));
  }

  createChart() {
    const percentages = this.calculatePercentages(this.input);
  
    this.chart = new Chart('canvas', {
      type: 'pie', // Change chart type to pie
      data: {
        labels: percentages.map(item => item.name),
        datasets: [
          {
            
            data: percentages.map(item => item.percentage),
            backgroundColor: [
              'red',
              'blue',
              'yellow',
              'green',
              'purple',
              'orange',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              generateLabels: function (chart: any) {
                const data = chart.data;
                if (data.labels?.length && data.datasets.length) {
                  return data.labels.map((label: string, index: number) => {
                    const value = data.datasets[0].data[index] as number;
                    return {
                      text: `${label}: ${value.toFixed(2)}%`,
                      fillStyle: data.datasets[0].backgroundColor[index],
                    };
                  });
                }
                return [];
              },
            },
          },
        },
      },
    });
  }

  ngOnInit() {
    this.createChart();
  }
}
