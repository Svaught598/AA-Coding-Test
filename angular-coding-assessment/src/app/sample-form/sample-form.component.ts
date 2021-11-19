import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router,NavigationStart} from '@angular/router';


enum StatusValues {
  ExecutivePlatinum = "Executive Platinum",
  PlatinumPro = "Platinum Pro",
  Platinum = "Platinum"
}


@Component({
  selector: 'sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {
  form : FormGroup;
  statusList = Object.values(StatusValues);
  badSubmit : boolean = false;

  constructor(private fb : FormBuilder, private r : Router) {}

  createForm() {
    this.form = this.fb.group(
      {
        email: ["", [
          Validators.required,
          Validators.email
        ]],
        status: [StatusValues.PlatinumPro, [
          Validators.required
        ]],
        password: ["", [
          Validators.required,
          Validators.minLength(8),
          this.containsUpperChar, 
          this.containsSpecialChar,
        ]]
      },
      { updateOn: "blur" }
    );
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  containsUpperChar(input : FormControl) {
    const value : string = input.value;
    return (value !== value.toLowerCase()) ? null : { needsUpper: true };
  }

  containsSpecialChar(input : FormControl) {
    const value : string = input.value;
    return (/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) ? null : { needsSpecial: true };
  }

  clearForm() {
    if (confirm("Are you sure you want to discard your changes?")) {
      this.form.reset({
        email: "",
        status: StatusValues.PlatinumPro,
        password: "",
      })
    }
    this.badSubmit = false;
  }

  submitForm() {
    if (!this.formIsValid()) {
      this.badSubmit = true;
      return alert("Some items are not valid. Please fix & resubmit.")
    }
    return this.r.navigate(['results'], { state: this.form.value });
  }

  formIsValid() {
    const errors : Array<ValidationErrors | null> = Object.keys(this.form.controls).map(key => {
      const errors : ValidationErrors | null = this.form.get(key)!.errors;
      return errors;
    });

    // If any validation errors, return false
    return !errors.some((value : ValidationErrors | null) => {
      return value !== null
    })
  }

  log(value : any) {
    console.log(value)
  }
}
