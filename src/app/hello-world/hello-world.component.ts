import {Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {last, map} from 'rxjs/operators';
import { LumbercampService } from '../services/lumbercamp.service';
import {Observable, Observer, Subject} from "rxjs";
import {IStock} from "../model/stock";
import { ChartConfiguration, ChartType, ChartDataset,Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { timer } from 'rxjs';
import {Md5} from 'ts-md5';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
})
export class HelloWorldComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  colorList: string[] = ['rgb(230,176,170)','rgb(230, 176, 170)','rgb(215, 189, 226)','rgb(215, 189, 226)',
      'rgb(163, 228, 215)','rgb(14, 98, 81)','rgb(212, 239, 223)','rgb(212, 172, 13)',
      'rgb(154, 125, 10)','rgb(186, 74, 0)','rgb(98, 101, 103)','rgb(23, 32, 42)',]
  displayedColumns: string[] = ['Type', 'Quantity'];
  dataSource = new MatTableDataSource<IStock>([]);
  types: string[] =[];
  private stockSource = new Subject<IStock[]>();
  currentStocks :IStock[] = [];
  history: Map<String,number[]> = new Map<String,number[]>;
  lineChartData: { datasets: { data: number[] | undefined; label: string; backgroundColor: string; borderColor: string; fill: string; }[]; labels: number[]; } | undefined;

  service: LumbercampService;

  constructor(private httpClient: HttpClient,private lumbercampService:LumbercampService) {
      this.service = lumbercampService;
  }

  refreshTypes(){
      this.service.getTypes().subscribe(r => {this.types = r});
  }

  addDataToChart(cStock :IStock[] ): void{

  }

  range(n:number){return Array.from({length: n}, (value, key) => key)}

  ngOnInit(): void {
    this.refreshTypes();
    this.types.forEach((t)=> this.history.set(t,[]));
    setInterval(() =>
      this.service.getStocks().subscribe(r => {
        let newHash = r.map(s=> Md5.hashStr(s.type+s.quantity));
        let currentHash = this.currentStocks.map(s=> Md5.hashStr(s.type+s.quantity));
        if( newHash.toString() !== currentHash.toString()){
            this.stockSource.next(r);
            this.currentStocks = r;
        }
      }),
        7000);
    this.stockSource.subscribe((cStock)=> {
        let tempDatasets: { data: number[] | undefined; label: string; backgroundColor: string; borderColor: string; fill: string; }[] = [];
        let maxlength =0;
        cStock.forEach((stock,index) => {
            let data = this.history.get(stock.type);
            if(data){
                data.push(stock.quantity);
                maxlength = data.length;
            }else{
                data = [stock.quantity];
                this.history.set(stock.type,data);
            }
            tempDatasets.push( {
                data : data,
                label: stock.type,
                backgroundColor: this.colorList[index],
                borderColor: this.colorList[index],
                fill: 'origin',
            });
        });
        this.lineChartData = {
            datasets : tempDatasets,
            labels : this.range(maxlength)
        }
        this.chart?.update('none');
    });
  }

    // @ts-ignore
    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0.5
            }
        },
        animation: {
            duration: 0, // general animation time
        },
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            y:
                {
                    position: 'left',
                }
        },
        plugins: {
            legend: { display: true }
        }
    };

    public lineChartType: ChartType = 'bar';

}
