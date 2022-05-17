import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { TicketsService } from "../../tickets.service";
import { Tickets } from "../../tickets.model";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  ticketForm: FormGroup;
  ticket: Tickets;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ticketsService: TicketsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.ticket.ticket_id;
      this.ticket = data.ticket;
    } else {
      this.dialogTitle = "New Ticket";
      this.ticket = new Tickets({});
    }
    this.ticketForm = this.createContactForm();
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
      id: [this.ticket.id],
      ticket_id: [this.ticket.ticket_id],
      createdBy: [this.ticket.createdBy],
      subject: [this.ticket.subject],
      status: [this.ticket.status],
      assignTo: [this.ticket.assignTo],
      date: [this.ticket.date],
      details: [this.ticket.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.ticketsService.addTicket(this.ticketForm.getRawValue());
  }
}
