import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';  
import {MatExpansionModule} from '@angular/material/expansion';
import { SantaComponent } from './components/santa/santa.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingComponent,
    SantaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxUiLoaderModule.forRoot({
      fgsColor:'white',
      fgsType: 'three-strings',
      hasProgressBar : false,
      fgsSize:120,
      text: "Loading...",
      pbColor:'red',
      textPosition:'center-center',
    }),
  ],
    providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
