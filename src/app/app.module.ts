import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import {SellingGamesService} from './services/selling-games.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    HttpModule,
     AgGridModule.withComponents([])
  ],
  providers: [SellingGamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
