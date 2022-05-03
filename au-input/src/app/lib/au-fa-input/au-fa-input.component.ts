import { AfterContentInit, Component, ContentChild, HostBinding, Input, OnInit } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.css'],
})
export class AuFaInputComponent implements OnInit, AfterContentInit {

  @Input() icon: string;

  @ContentChild(InputRefDirective, { static: false }) input: InputRefDirective

  constructor() { }

  ngAfterContentInit(): void {
    console.log(this.input);
  }

  ngOnInit() {
  }

  get classes() {
    const cssClasses = {};

    if (this.icon) {
      cssClasses[`fa-${this.icon}`] = true;
    }

    return cssClasses;
  }

  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }
}
