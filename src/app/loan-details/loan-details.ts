import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoanApplication } from '../models/loan.model';
import { Store } from '@ngxs/store';
import { HighlightRate } from '../shared/highlight-rate';

@Component({
  selector: 'app-loan-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightRate,],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.css',
})
export class LoanDetails {
  loan = signal<LoanApplication | null>(null);
  emi = computed(() =>{
    const p = this.loan()?.pricing;
    if(!p || !p.loanAmount || !p.tenureMonths || !p.interestRate){
      return 0;
    }
    const principal = p.loanAmount;
    const n = p.tenureMonths;
    const r = (p.interestRate/100)/12;
    if(r==0)  return principal/n;
    const x = Math.pow(1+r,n);
    const emi = principal*r*x/(x-1);
    return emi;
  });

  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if(!id) return;
      const loan = this.store.selectSnapshot(s => (s as any).loanState.loan.find((l:any)=>l.id === id));
      this.loan.set(loan ?? null);
    });
  }
}
