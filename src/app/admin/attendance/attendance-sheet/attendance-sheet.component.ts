import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-attendance-sheet",
  templateUrl: "./attendance-sheet.component.html",
  styleUrls: ["./attendance-sheet.component.sass"],
})
export class AttendanceSheetComponent implements OnInit {
  attendanceForm: FormGroup;
  constructor() {
    this.attendanceForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
  }
  ngOnInit(): void {}
}
