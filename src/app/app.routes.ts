import { Routes } from '@angular/router';
import { LoanList } from './loan-list/loan-list';
import { LoanForm } from './loan-form/loan-form';
import { LoanDetails } from './loan-details/loan-details';

export const routes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: LoanList},
    {path: 'new', component: LoanForm},
    {path: 'edit/:id', component: LoanForm},
    {path: 'details/:id', component: LoanDetails},
    // {path: '**', redirectTo: '/list'}
];
