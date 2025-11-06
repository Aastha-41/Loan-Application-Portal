import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-pricing-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './pricing-form.html',
    styleUrl: './pricing-form.css',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PricingForm),
        multi: true
    }]
})
export class PricingForm implements ControlValueAccessor, OnInit {

    fg = new FormGroup({
        loanAmount: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
        tenureMonths: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
        productName: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        interestRate: new FormControl<number>(0, [Validators.required, Validators.min(0.1)])
    });

    private onTouched = () => {};
    private onChange: (val: any) => void = () => {};

    ngOnInit(){
        this.fg.valueChanges.subscribe(v=> this.onChange(v));
    }
    writeValue(obj: any): void {
        if(obj){
            this.fg.patchValue(obj, {emitEvent: false});
        }
    }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
}