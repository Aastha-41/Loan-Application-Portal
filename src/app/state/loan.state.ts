import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoanApplication } from "../models/loan.model";
import { Inject, Injectable } from "@angular/core";
import { AddLoan, UpdateLoan, RemoveLoan, LoadInitial } from "./loan.actions";


export interface LoanStateModel{
    loans: LoanApplication[];
}
@State<LoanStateModel>({
    name: 'loans',
    defaults: {
        loans: []
    }
})
@Injectable()
export class LoanState{
    @Selector()
    static loans(state: LoanStateModel): LoanApplication[]{
        return state.loans;
    }
    @Selector()
    static getById(state: LoanStateModel){
        return (id: string) => state.loans.find(l => l.id === id) ?? null;
    }

    private static calculateEMI(principal: number, annualRate: number, months: number): number {
    const r = annualRate / 12 / 100;
    if (r === 0) return principal / months;
    const emi = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    return Math.round(emi);
    }
    @Selector()
  static loansWithEmi(state: LoanStateModel) {
    return state.loans.map(l => ({
      ...l,
      pricing: l.pricing?{
        ...l.pricing,
        emiPerMonth: LoanState.calculateEMI(
          l.pricing?.loanAmount ,
          l.pricing.interestRate ,
          l.pricing.tenureMonths 
        )
      }
      : null
      }));
  }

    @Action(LoadInitial)
LoadInitial(ctx: StateContext<LoanStateModel>) {
  const initial: LoanApplication[] = [
    {
      id: '1',
      applicant: {
        id: 'a1',
        FullName: 'Karishma',
        Email: 'Karishma12@gmail.com',
        PhoneNumber: '9876543210',
        DateOfBirth: '1990-05-15',
        applicationDate: new Date().toISOString().slice(0, 10)
      },
      pricing: {
        loanAmount: 500000,
        tenureMonths: 24,
        productName: 'Gold',
        interestRate: 8
      }
    }
  ];

  ctx.patchState({ loans: initial });
}


    @Action(AddLoan)
    add(ctx: StateContext<LoanStateModel>, action: AddLoan){
        const state = ctx.getState();
        ctx.patchState({
            loans: [...state.loans, action.payload]
        });
    }

    @Action(UpdateLoan)
    update(ctx: StateContext<LoanStateModel>, action: UpdateLoan) {
        const state = ctx.getState();
        ctx.patchState({
            loans: state.loans.map(l =>
                l.id === action.id ? { ...l, ...action.payload } : l
            )
        });
    }

    @Action(RemoveLoan)
    remove(ctx: StateContext<LoanStateModel>, action: RemoveLoan){
        const state = ctx.getState();
        ctx.patchState({ loans: state.loans.filter(l => l.id !== action.id)});
    }
}