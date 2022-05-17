import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Alert } from "selenium-webdriver";
@Component({
  selector: "app-add-payment",
  templateUrl: "./add-payment.component.html",
  styleUrls: ["./add-payment.component.sass"],
})
export class AddPaymentComponent {
  paymentForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      bNo: ["", [Validators.required]],
      pName: ["", [Validators.required]],
      dName: ["", [Validators.required]],
      pDate: ["", [Validators.required]],
      dDate: ["", [Validators.required]],
      discount: [""],
      total: [""],
      pMethod: ["", [Validators.required]],
      pStatus: ["", [Validators.required]],
    });
  }
  onSubmit() {
    console.log("Form Value", this.paymentForm.value);
    window.alert("Payment has successfully been sent!")
  }
}
