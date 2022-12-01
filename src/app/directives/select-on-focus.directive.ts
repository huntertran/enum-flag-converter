import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[selectOnFocus]'
})
export class SelectOnFocusDirective
{
    constructor(private element: ElementRef) {
    }

    @HostListener('focus') onFocus() {
        this.selectText();
    }

    private selectText(): void {
        console.log(this.element)
        this.element.nativeElement.select();
    }
}