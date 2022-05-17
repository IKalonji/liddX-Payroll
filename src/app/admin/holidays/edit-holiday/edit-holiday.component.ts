import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-edit-holiday",
  templateUrl: "./edit-holiday.component.html",
  styleUrls: ["./edit-holiday.component.sass"],
})
export class EditHolidayComponent {
  holidayForm: FormGroup;
  formdata = {
    hNo: "01",
    hName: "World Aids Day",
    date: "2021-12-10T14:22:18Z",
    location: "All Locations",
    shift: "All Shifts",
    details: "This festival is celebrate for.",
  };
  constructor(private fb: FormBuilder) {
    this.holidayForm = this.createContactForm();
  }
  onSubmit() {
    console.log("Form Value", this.holidayForm.value);
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      hNo: [this.formdata.hNo, [Validators.required]],
      hName: [this.formdata.hName, [Validators.required]],
      date: [this.formdata.date, [Validators.required]],
      location: [this.formdata.location, [Validators.required]],
      shift: [this.formdata.shift, [Validators.required]],
      details: [this.formdata.details, [Validators.required]],
    });
  }
}
