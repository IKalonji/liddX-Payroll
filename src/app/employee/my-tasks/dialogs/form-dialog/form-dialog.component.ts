import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { MyTasksService } from "../../my-tasks.service";
import { MyTasks } from "../../my-tasks.model";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  myTasksForm: FormGroup;
  myTasks: MyTasks;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public myTasksService: MyTasksService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.myTasks.taskNo;
      this.myTasks = data.myTasks;
    } else {
      this.dialogTitle = "New MyTasks";
      this.myTasks = new MyTasks({});
    }
    this.myTasksForm = this.createContactForm();
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
      id: [this.myTasks.id],
      taskNo: [this.myTasks.taskNo],
      project: [this.myTasks.project],
      client: [this.myTasks.client],
      status: [this.myTasks.status],
      priority: [this.myTasks.priority],
      type: [this.myTasks.type],
      executor: [this.myTasks.executor],
      date: [
        formatDate(this.myTasks.date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      details: [this.myTasks.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.myTasksService.addMyTasks(this.myTasksForm.getRawValue());
  }
}
