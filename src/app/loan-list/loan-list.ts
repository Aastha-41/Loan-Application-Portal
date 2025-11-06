import { Component, computed, signal } from '@angular/core';
import { NgxsModule, Store} from '@ngxs/store';
import { LoanState } from '../state/loan.state';
import { Observable } from 'rxjs';
import { LoanApplication } from '../models/loan.model';
import { RemoveLoan } from '../state/loan.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxsModule],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.css',
})
export class LoanList {
  loans = signal<LoanApplication[]>([]);
  search = signal('');

  filtered= computed(() => {
    const allLoans = this.loans();
    const query = this.search().toLowerCase();
    return allLoans.filter(l =>
      l.applicant.FullName.toLowerCase().includes(query)
    );
  });
  constructor(private store: Store){
    const loansSignal = this.store.selectSignal(LoanState.loans);
    this.loans.set(loansSignal());
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
