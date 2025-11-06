import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet, Routes} from '@angular/router';
import { LoanList } from './loan-list/loan-list';
import { LoanForm } from './loan-form/loan-form';
import { LoanDetails } from './loan-details/loan-details';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { LoadInitial } from './state/loan.actions';


const routes: Routes = [
  {path: '', component: LoanList},
  {path: 'new', component:LoanForm},
  {path: 'edit/:id', component: LoanForm},
  {path: 'details/:id', component: LoanDetails},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loan-application-portal');
  constructor(private store: Store){
    this.store.dispatch(new LoadInitial());
  }
}
