import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';


export interface PeriodicElement {
  id: number,
  date: string;
  allDayPlan: string;
  morningPlan: string;
  afterNoonPlan: string;
  atNightPlan: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  // displayedColumns: string[] = ['action', 'date', 'edit', 'delete'];
  dataSource: PeriodicElement[] = [];
  update: boolean = false;
  updatedId?: number;

  ChristmasForm = new FormGroup({
    action: new FormControl(''),
    selectedDate: new FormControl(new Date('')),
    morningPlan: new FormControl(''),
    afterNoonPlan: new FormControl(''),
    atNightPlan: new FormControl(''),
    allDayPlan: new FormControl(''),
  });

  constructor(private datePipe: DatePipe, private router: Router, private api: ApiService,private snack : SnackBarService,private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void {
    this.ngxService.start();
    this.api.getPlanData().subscribe(result => {
      if (result.length > 0) {
        this.dataSource = JSON.parse(result[0].planData);
        this.sortDataByDate();
      }
      this.ngxService.stop();
    })
  }

  save() {
    const morningPlan = this.ChristmasForm.get('morningPlan')?.value;
    const afterNoonPlan = this.ChristmasForm.get('afterNoonPlan')?.value;
    const atNightPlan = this.ChristmasForm.get('atNightPlan')?.value;
    const allDayPlan = this.ChristmasForm.get('allDayPlan')?.value;
    const selectedDate = this.ChristmasForm.get('selectedDate')?.value;
    if (this.updatedId == undefined) {
      if (selectedDate != null && (allDayPlan != '' || (morningPlan != '' && afterNoonPlan != '' && atNightPlan != ''))) {
        let data: PeriodicElement = {
          id: this.dataSource.length + 1,
          date: this.datePipe.transform(selectedDate, 'dd-MM-yyyy')!!,
          allDayPlan: allDayPlan!,
          morningPlan: morningPlan!,
          afterNoonPlan: afterNoonPlan!,
          atNightPlan: atNightPlan!,
        };
        this.dataSource.push(data);
        this.sortDataByDate();

        this.ngxService.start();
        this.api.updateUser({ planData: JSON.stringify(this.dataSource) }).subscribe(result => {
          if(result.success == true){
            this.ChristmasForm.reset();
            window.location.reload();
            this.ngxService.stop();
          }else{
            this.ngxService.stop();
            this.snack.open('Internal Server Err')
          }
        })
      } else {
        this.snack.open('Add your plan for a day')
      }
    }
    else {
      if (selectedDate != null && (allDayPlan != '' || (morningPlan != '' && afterNoonPlan != '' && atNightPlan != ''))) {
        for (let i = 0; i < this.dataSource.length; i++) {
          if (this.dataSource[i].id == this.updatedId) {
            this.dataSource[i].morningPlan = this.ChristmasForm.get('morningPlan')?.value!;
            this.dataSource[i].afterNoonPlan = this.ChristmasForm.get('afterNoonPlan')?.value!;
            this.dataSource[i].atNightPlan = this.ChristmasForm.get('atNightPlan')?.value!;
            this.dataSource[i].allDayPlan = this.ChristmasForm.get('allDayPlan')?.value!;
            this.dataSource[i].date = this.datePipe.transform(this.ChristmasForm.get('selectedDate')?.value, 'dd-MM-yyyy')!;
          }
        }
        this.sortDataByDate();
        this.ngxService.start();
        this.api.updateUser({ planData: JSON.stringify(this.dataSource) }).subscribe(result => {
          if(result.success == true){
            this.ChristmasForm.reset();
            window.location.reload();
            this.ngxService.stop();
          }else{
            this.ngxService.stop();
            this.snack.open('Internal Server Err')
          }
        })
      }
    }
  }

  delete(index: number) {
    this.dataSource = this.dataSource.filter(item => item.id !== index);
    this.api.updateUser({ planData: JSON.stringify(this.dataSource) }).subscribe(result => {
      if(result.success == false){
        this.snack.open('Internal Server Err')
      }
    })
  }

  edit(element?: PeriodicElement) {
    this.update = true;
    if (element) {
      this.updatedId = element.id;
      const dateString = element.date;
      const dateParts = dateString.split('-');
      const parsedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      this.ChristmasForm.get('selectedDate')?.setValue(parsedDate);
      this.ChristmasForm.get('allDayPlan')?.setValue(element.allDayPlan);
      this.ChristmasForm.get('morningPlan')?.setValue(element.morningPlan);
      this.ChristmasForm.get('afterNoonPlan')?.setValue(element.afterNoonPlan);
      this.ChristmasForm.get('atNightPlan')?.setValue(element.atNightPlan);
      this.changeInput();
    }
  }

  cancel() {
    this.update = false;
  }

  logout() {
    this.router.navigate(['']);
  }

  sortDataByDate(): void {
    this.dataSource.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });
  }

  changeInput() {
    let allDayPlan = this.ChristmasForm.get('allDayPlan')?.value;
    if (allDayPlan != '') {
      this.ChristmasForm.get('morningPlan')?.disable();
      this.ChristmasForm.get('afterNoonPlan')?.disable();
      this.ChristmasForm.get('atNightPlan')?.disable();
    } else {
      this.ChristmasForm.get('morningPlan')?.enable();
      this.ChristmasForm.get('afterNoonPlan')?.enable();
      this.ChristmasForm.get('atNightPlan')?.enable();
    }
  }

  getDayOfWeek(dateString: string): string {
    const dateParts = dateString.split('-');
    const formattedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[formattedDate.getDay()];
  }
}
