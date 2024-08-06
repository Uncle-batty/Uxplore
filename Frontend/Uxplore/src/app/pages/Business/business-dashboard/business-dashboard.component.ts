import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  NgApexchartsModule,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { style } from '@angular/animations';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  seriesNonAxis: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  tooltip?: ApexTooltip;
  stroke?: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
  colors?: string[];
  responsive: ApexResponsive[]; //pie chart
  labels: string[]; //pie chart
  style?: string[];
};

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, NgApexchartsModule],
})
export class BusinessDashboardComponent implements OnInit {
  public columnChartOptions: Partial<ChartOptions>;
  public areaChartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;

  constructor() {
    this.columnChartOptions = {
      series: [
        {
          name: 'Views',
          data: [44, 55, 57, 56, 61],
        },
        {
          name: 'Likes',
          data: [76, 85, 101, 98, 87],
        },
        {
          name: 'Share',
          data: [35, 41, 36, 26, 45],
        },
        {
          name: 'Save',
          data: [35, 41, 36, 26, 45],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '65%',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#999999'],
        },
      },

      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['18 - 21', '22 - 24', '25 - 27', '28 - 30', '30 - 35'],
        title:{
          text: 'Age Group',
          style:{
            color: '#FFFFFF'
          }
        },
        labels: {
          style: {
            colors: '#FFFFFF', // Set the color to white
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Users',
          style:{
            color: '#FFFFFF'
          }
        },
        labels: {
          style: {
            colors: '#FFFFFF', // Set the color to white
          },
        },
      },
      fill: {
        opacity: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '' + val + '';
          },
        },
        theme: 'dark',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        labels: {
          colors: '#FFFFFF', // Set legend text color to white
        },
      },
      colors: ['#FFFFFF', '#8030E8', '#C8C6C6', '#D4BAF7'],
    };

    this.areaChartOptions = {
      series: [
        {
          name: 'Advert 1',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 60,
            }
          ),
        },
        {
          name: 'Advert 2',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 20,
            }
          ),
        },
        {
          name: 'Advert 3',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 15,
            }
          ),
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ['#FFFFFF', '#8030E8', '#C8C6C6'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        labels: {
          colors: '#FFFFFF',
        },
      },

      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#FFFFFF', // Set the color to white
          },
        },
        title: {
          text: 'Date',
          style: {
            color: '#FFFFFF',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#FFFFFF', // Set the color to white
          },
        },
        title: {
          text: 'Advert Impressions',
          style: {
            color: '#FFFFFF',
          },
        },
      },
      tooltip: {
        theme: 'dark',
      },
    };

    this.pieChartOptions = {
      seriesNonAxis: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
      },
      colors: ['#BBBFCA', '#8030E8', '#C8C6C6', '#D4BAF7', '#666666'],
      fill: {
        type: 'solid',
      },
      labels: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
              labels:{
                colors: '#FFFFFF'
              }
            },
          },
        },
      ],
      legend: {
        labels:{
          colors: '#FFFFFF',
        }
      }
    };
  }

  public generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ): [number, number][] {
    let series: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      let x = baseval;
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000; // Add one day in milliseconds
    }
    return series;
  }

  ngOnInit() {}
}
