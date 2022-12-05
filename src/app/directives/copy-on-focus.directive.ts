import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Directive({
    selector: '[copyOnClick]'
})
export class CopyOnClickDirective {

    constructor(private element: ElementRef,
                private snackBar: MatSnackBar) {
    }

    @HostListener('click')
    async onClick() {
        await this.copyText();
    }

    private async copyText(): Promise<void> {
        await navigator.clipboard.writeText(this.element.nativeElement.innerHTML);
//        this.snackBar.open("" ,"Result have been copied to clipboard!", { duration: '1' });
        this.snackBar.open("Result have been copied to clipboard!", "Close", {duration: 1000})
    }
}