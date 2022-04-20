import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appIsEllipsDirective]'
})
export class IsEllipsDirectiveDirective {


  private element: HTMLInputElement;
  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
    console.log("this.element");
  }
  ngOnInit() {
    console.log('Directive called');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    setTimeout(() => {

      if (this.element.offsetWidth < this.element.scrollWidth) {
        this.element.title = this.element.textContent;
        console.log(    this.element.title);
      }
      else if (this.element.title) this.element.removeAttribute('title');
    },3000);
  }


}
