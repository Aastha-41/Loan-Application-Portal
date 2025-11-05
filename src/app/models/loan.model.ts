export interface Applicant {
    id: string;
    FullName: string;
    Email: string;
    PhoneNumber: string;
    DateOfBirth: string;
    applicationDate: string;
}
export interface Pricing{
    loanAmount: number;
    tenureMonths: number;
    productName: string;
    interestRate: number;
    emiPerMonth?: number;
}
export interface LoanApplication {
    id: string;
    applicant: Applicant;
    pricing: Pricing | null;
}