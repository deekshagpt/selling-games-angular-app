import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellingGamesService } from './services/selling-games.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  private gridApi;
  private gridColumnApi;
  private csvData: any;
  private rowData: any;

  defaultColDef = { sortable: false };
  sortingOrder = ["desc", "asc", null];


  columnDefs = [
    { headerName: 'Rank', field: 'Rank', width: 90,resizable: true },
    { headerName: 'Name', field: 'Name', filter: true,width: 100, resizable: true },
    { headerName: 'Platform', field: 'Platform',width: 90, resizable: true },
    { headerName: 'Year', field: 'Year', sortable:true,width: 90, resizable: true },
    { headerName: 'Genre', field: 'Genre',width: 90, resizable: true },
    { headerName: 'Publisher', field: 'Publisher',width: 90, resizable: true },
    { headerName: 'Global_Sales', field: 'Global_Sales',width: 90, resizable: true }

  ];
  constructor(private sellingGamesService: SellingGamesService) {

  }

  ngOnInit() {
    let csvData;
    this.subscription = this.sellingGamesService.getSellingGamesData().subscribe(
      csvData => {
        if (csvData != null) {
          setTimeout(() => {
            this.populateSellingGamesData(csvData);
          }, 1);
        }
      },
      err => {
        console.log(err)
      });

      
    }
  populateSellingGamesData(csvData: string): any {
      var lines = csvData.split("\n");
      var result = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length - 1; i++) {
  
        var obj = {};
        var currentline = lines[i].split(",");
  
        for (var j = 0; j < headers.length - 1; j++) {
          obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
      }
      this.rowData = result;
  
    }

    onGridSizeChanged(params) {
      var gridWidth = document.getElementById("myGrid").offsetWidth;
      var columnsToShow = [];
      var columnsToHide = [];
      var totalColsWidth = 0;
      var allColumns = params.columnApi.getAllColumns();
      for (var i = 0; i < allColumns.length-1; i++) {
        let column = allColumns[i];
        totalColsWidth += column.getMinWidth();
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.colId);
        } else {
          columnsToShow.push(column.colId);
        }
      }
      params.columnApi.setColumnsVisible(columnsToShow, true);
      params.columnApi.setColumnsVisible(columnsToHide, false);
      params.api.sizeColumnsToFit();
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.sizeColumnsToFit();

      params.api.sizeColumnsToFit();
      window.addEventListener("resize", function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit();
        });
      });
    }
  } 

