import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { EmployeesService } from "../../employees.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Employees } from "../../employees.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  employeesForm: FormGroup;
  employees: Employees;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public employeesService: EmployeesService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.employees.name;
      this.employees = data.employees;
    } else {
      this.dialogTitle = "New Employees";
      this.employees = new Employees({});
    }
    this.employeesForm = this.createContactForm();
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
      id: [this.employees.id],
      img: [this.employees.img],
      name: [this.employees.name],
      email: [this.employees.email],
      date: [
        formatDate(this.employees.date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      role: [this.employees.role],
      mobile: [this.employees.mobile],
      department: [this.employees.department],
      degree: [this.employees.degree],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
}
