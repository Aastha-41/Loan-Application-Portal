import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PricingForm } from './pricing-form';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddLoan, UpdateLoan } from '../state/loan.actions';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';
import { LoanApplication, Pricing } from '../models/loan.model';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PricingForm],
  templateUrl: './loan-form.html',
  styleUrl: './loan-form.css',
})
export class LoanForm {
  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    applicationDate: new FormControl(new Date().toISOString().slice(0,10)),
    pricing: new FormControl(null)
  });
  editing = false;
  id?: string;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute){
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if(id){
        this.editing = true;
        this.id = id;
        const loan = this.store.selectSnapshot(s => (s as any).loanState.loans.find((l: any)=>l.id === id));
        if(loan){
          const {applicant, pricing} = loan;
          this.form.patchValue({
            fullName: applicant.fullName,
            email: applicant.email,
            phone: applicant.phone,
            dob: applicant.dob,
            applicationDate: applicant.applicationDate,
            pricing
          });
        }
      }
    });
  }

  save(){
    const fv = this.form.value;
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
      pricing: fv.pricing as Pricing | null
    };
    if(this.editing && this.id){
      this.store.dispatch(new UpdateLoan(this.id, loan));
    } else {
      this.store.dispatch(new AddLoan(loan));
    }
    this.router.navigate(['/']);
  }
}
