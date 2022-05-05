import { AfterContentInit, Component, ContentChild, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'au-md-input',
  templateUrl: './au-md-input.component.html',
  styleUrls: ['./au-md-input.component.scss'],
})
export class AuMdInputComponent implements OnInit, AfterContentInit {

  @Input() icon: string;

  @ContentChild(InputRefDirective, { static: false }) input: InputRefDirective

  constructor() { }

  ngAfterContentInit(): void {
    console.log(this.input);
  }

  ngOnInit() {
  }

  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }
}
