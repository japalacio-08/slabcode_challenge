import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[NumbersOnly]'
})
export class NumberOnlyDirective {
    // Allow decimal numbers. The \. is only allowed once to occur
    private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'Meta', 'Control', 'c', 'C', 'V', 'v' ];

    constructor(private el: ElementRef) {
    }

    private control_ = false

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            if (['Meta', 'Control'].includes(event.key)) {
                this.control_ = true;
            }
            if (['c', 'C', 'V', 'v'].includes(event.key) && this.control_) {
                this.control_ = false;
            }
            return;
        }

        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

    @HostListener('paste', [ '$event' ])
    onPaste(event: any) {
        const next = (event.clipboardData || event.originalEvent.clipboardData).getData('text');

        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}