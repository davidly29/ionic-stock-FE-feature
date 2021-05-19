import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../Customer';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  chartData: ChartDataSets[] = [{data: [], label: 'Stock price'}];
  chartLabels: Label[] = [];

  chartDataLine: ChartDataSets[] = [{data: [], label: 'Stock price'}];
  chartLabelsLine: Label[] = [];

  // eslint-disable-next-line max-len
  customerReviews: Customer[] = [new Customer('Lara', 'This application is cool ! I can see all the stock data for apple in one place !', Date.now().toString(), 'assets/icon/lc.jpg'), new Customer('David', 'I want to see my stock go up. Ive bought at a good time !', Date.now().toString(), 'assets/icon/drice.jpg')];
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'History Price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
    borderColor: '#000000',
    backgroundColor: '#be9e9e'
    }
  ];
  chartType = 'line';
  chartTypeBar = 'bar';
  chartTypePie = 'pie';
  showLegend = false;
  stock = 'APPL';
  newComment = '';
  isReview = false;
  constructor(private http: HttpClient) {
    this.populateData();
  }

  populateData() {
    // eslint-disable-next-line max-len
    this.http.get('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=98f1029df0cd51ace7a1dd5e63c39a2b').subscribe(res => {
      console.log(res);

      console.log(this.stock);
      this.chartData[0].data = [];
      this.chartLabels = [];

      let history = res['historical'];
      let historyLine = res['historical'];
      history = history.splice(0, 100); // Splitting array to have less data
      historyLine = history.splice(0,30);

      for (let entry of history) {
        this.chartLabels.push(entry.date); // set date for Y axis
        this.chartData[0].data.push(entry['close']); // Set "close" fro vertical X axis (As per Json)
      }

      for (let entry of historyLine) {
        this.chartLabelsLine.push(entry.date); // set date for Y axis
        this.chartDataLine[0].data.push(entry['close']); // Set "close" fro vertical X axis (As per Json)
      }

    });
  }
  post() {
    this.customerReviews.push(new Customer('Dave', this.newComment, Date.now().toString()));
  }
  commentNow() {
    this.isReview = true;
    return this.isReview;
  }

}
