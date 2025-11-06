import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightRate } from './highlight-rate';

describe('HighlightRate', () => {
  let mockE1: ElementRef;
  let mockRenderer: Renderer2;
  beforeEach(()=>{
    mockE1 = new ElementRef(document.createElement('div'));
    mockRenderer = {
      setStyle: jasmine.createSpy('setStyle'),
    } as any;
  });

  it('should create an instance', () => {
    const directive = new HighlightRate(mockE1, mockRenderer);
    directive.rate = 8;
    directive.ngOnChanges();
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(
      mockE1.nativeElement,
      'background',
      'red'
    );
  });
  it('should set green background if rate<= threshold', () => {
    const directive = new HighlightRate(mockE1, mockRenderer);
    directive.rate = 5;
    directive.ngOnChanges();
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(
      mockE1.nativeElement,
      'background',
      'green'
    );
  });
});
