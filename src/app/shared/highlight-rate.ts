import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightRate]',
  standalone: true,
})
export class HighlightRate implements OnChanges{
  @Input()  rate?: number;

  constructor(private el: ElementRef, private r: Renderer2) {}
  ngOnChanges(){
    const threshold = 6;
    if(this.rate == null) return;
    const color = this.rate > threshold ? 'rgba(194, 75, 75, 1)': 'rgba(125, 184, 125, 1)';
    this.r.setStyle(this.el.nativeElement, 'background', color);
    this.r.setStyle(this.el.nativeElement, 'padding', '0.2rem 0.4rem');
    this.r.setStyle(this.el.nativeElement, 'border-radius', '4px');
  }
}
