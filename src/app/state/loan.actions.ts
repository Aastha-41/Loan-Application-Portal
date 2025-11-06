import { LoanApplication } from "../models/loan.model";

export class AddLoan{
    static readonly type = '[Loan] Add';
    constructor(public payload: LoanApplication){}
}
export class UpdateLoan{
    static readonly type = '[Loan] Update';
    constructor(public id: string, public loan : LoanApplication){}
}
export class RemoveLoan{
    static readonly type = '[Loan] Remove';
    constructor(public id: string){}
}
export class LoadInitial{
    static readonly type = '[Loan] LoadInitial';
}