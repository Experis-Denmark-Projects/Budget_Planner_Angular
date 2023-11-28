import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-new-charts',
  templateUrl: './new-charts.component.html',
  styleUrls: ['./new-charts.component.css']
})
export class NewChartsComponent implements OnInit {
  title = 'Antal procent hver kategory fylder fra det total budget ';
  chart: any = [];
  chart2:any =[];

  chartType: keyof ChartTypeRegistry= 'pie';
  
  @Input() input:{ name: string; totalPrice: number }[] = []

  categories = [

  ];

  private calculatePercentages(categories: { name: string; totalPrice: number }[]): { name: string; percentage: number }[] {
    const total = categories.reduce((sum, category) => sum + category.totalPrice, 0);
  
    return categories.map(category => ({
      name: category.name,
      percentage: (category.totalPrice / total) * 100
    }));
  }

  createProcentagesChart() {

    const percentages = this.calculatePercentages(this.input);
  
  
    this.chart = new Chart('canvas', {
      type: this.chartType, // Change chart type to pie
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
            position: 'bottom',
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

  createTotalsChart(){
    
    const percentages = this.input
  
    this.chart2 = new Chart('canvas2', {
      type: 'bar', // Change chart type to pie
      data: {
        labels: percentages.map(item => item.name),
        datasets: [
          {
            
            data: percentages.map(item => item.totalPrice),
            label: 'Total spent on each category',
            backgroundColor: [
              'red'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  ngOnInit() {
    this.createProcentagesChart();
    this.createTotalsChart();
  }

toggleChartType(){
  //this.chartType = 'bubble'
  this.chartType = this.chartType === 'pie' ? 'bar' : 'pie';
  if (this.chart) {
    this.chart.destroy();
  }
  this.createProcentagesChart();
}

}
