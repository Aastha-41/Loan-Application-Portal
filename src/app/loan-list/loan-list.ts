import { Component, computed, signal } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoanState } from '../state/loan.state';
import { Observable } from 'rxjs';
import { LoanApplication } from '../models/loan.model';
import { RemoveLoan } from '../state/loan.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.css',
})
export class LoanList {
  @Select(LoanState.loans) loans$!: Observable<LoanApplication[]>;
  loans: LoanApplication[] = [];
  search = signal('');
  filtered= computed(() => {
    return this.loans.filter(l => l.applicant.FullName.toLowerCase().includes(this.search().toLowerCase()));
  });
  constructor(private store: Store){
    this.loans$.subscribe(x => this.loans = x);
  }

  onSearch(q: string){
    this.search.set(q);
  }
  delete(id: string){
    if(confirm('Delete this application?')){
      this.store.dispatch(new RemoveLoan(id));
    }
  }
}
