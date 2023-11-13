import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  
  
  categories = [
    { name: "Category1", totalPrice: 150 },
    { name: "Category2", totalPrice: 150 },
    { name: "Category3", totalPrice: 150 },
    
  ];


  chartOptions = {
	  animationEnabled: true,
	  title: {
		text: "Sales by Department"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "##.##'%'",
		dataPoints: [
      //dummy data. Get overridden
		  { y: 10, name: "Toys" },
		  { y: 15, name: "Electronics" },
		  { y: 25, name: "Groceries" },
		  { y: 50, name: "Furniture" }
		]
	  }]
	}	


  private calculatePercentages(categories: { name: string; totalPrice: number }[]): { name: string; percentage: number }[] {
    const total = categories.reduce((sum, category) => sum + category.totalPrice, 0);
  
    return categories.map(category => ({
      name: category.name,
      percentage: (category.totalPrice / total) * 100
    }));
  }



  updateChartData() {
    this.chartOptions.data[0].dataPoints = this.calculatePercentages(this.categories).map(category => ({
      y: category.percentage,
      name: category.name
    }));
  }

  ngOnInit() {
    this.updateChartData();
  }

}
