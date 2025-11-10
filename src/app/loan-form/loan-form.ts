import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PricingForm } from './pricing-form';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddLoan, UpdateLoan } from '../state/loan.actions';
import { v4 as uuidv4, validate } from 'uuid';
import { LoanApplication, Pricing } from '../models/loan.model';
import { LoanState } from '../state/loan.state';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PricingForm],
  templateUrl: './loan-form.html',
  styleUrl: './loan-form.css',
})
export class LoanForm {

  private defaultPricing: Pricing = {
    loanAmount: 0,
    tenureMonths: 0,
    productName: '',
    interestRate: 0
  };

  loanForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dob: new FormControl('', [Validators.required]),
    applicationDate: new FormControl(new Date().toISOString().slice(0,10), [Validators.required]),
    pricing: new FormControl(this.defaultPricing)
  });
  editing = false;
  id?: string;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute){
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if(id){
        this.editing = true;
        this.id = id;


        const loan = this.store.selectSnapshot(
          (state: any) => state.loans.loans?.find((l : LoanApplication) => l.id === id));
        if(loan){
          this.loanForm.patchValue({
            fullName: loan.applicant.FullName,
            email: loan.applicant.Email,
            phone: loan.applicant.PhoneNumber,
            dob: loan.applicant.DateOfBirth,
            applicationDate: loan.applicant.applicationDate,
            pricing: loan.pricing || this.defaultPricing
          });
        }
      }
    });
  }

  cancel(){
    this.router.navigate(['/']);
  }

  save(){

    if(this.loanForm.invalid){
      this.loanForm.markAllAsTouched();
      return;
    }

    const fv = this.loanForm.getRawValue();
    const pricing: Pricing = fv.pricing ?? this.defaultPricing;

    const loan : LoanApplication = {
      id: this.id ?? uuidv4(),
      applicant:{
        id: this.id ?? uuidv4(),
        FullName: fv.fullName ?? '',
        Email: fv.email ?? '',
        PhoneNumber: fv.phone ?? '',
        DateOfBirth: fv.dob ?? '',
        applicationDate: fv.applicationDate ?? ''
      },
      pricing
    };
    if(this.editing && this.id){
      this.store.dispatch(new UpdateLoan(this.id, loan));
    } else {
      this.store.dispatch(new AddLoan(loan));
    }
    this.router.navigate(['/list']);
  }
}
