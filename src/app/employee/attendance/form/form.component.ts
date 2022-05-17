import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { AttendancesService } from "../attendance.service";
import { Attendances } from "../attendance.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  isDetails = false;
  attendancesForm: FormGroup;
  attendances: Attendances;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public attendancesService: AttendancesService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "details") {
      this.attendances = data.attendances;
      this.isDetails = true;
    }
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.attendances.id],
      date: [
        formatDate(this.attendances.date, "yyyy-MM-dd, HH:mm", "en"),
        [Validators.required],
      ],
      check_in: [this.attendances.check_in],
      break: [this.attendances.break],
      check_out: [this.attendances.check_out],
      hours: [this.attendances.hours],
      status: [this.attendances.status],
      details: [this.attendances.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.attendancesService.addAttendances(this.attendancesForm.getRawValue());
  }
}
