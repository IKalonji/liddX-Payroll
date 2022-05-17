import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { ClientsService } from "../../clients.service";
import { Clients } from "../../clients.model";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  clientForm: FormGroup;
  clients: Clients;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public clientService: ClientsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.clients.name;
      this.clients = data.clients;
    } else {
      this.dialogTitle = "New Client";
      this.clients = new Clients({});
    }
    this.clientForm = this.createContactForm();
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
      id: [this.clients.id],
      img: [this.clients.img],
      name: [this.clients.name],
      email: [this.clients.email],
      mobile: [this.clients.mobile],
      company_name: [this.clients.company_name],
      currency: [this.clients.currency],
      billing_method: [this.clients.billing_method],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.clientService.addClient(this.clientForm.getRawValue());
  }
}
