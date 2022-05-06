

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuFaInputComponent } from "./au-fa-input/au-fa-input.component";
import { InputRefDirective } from "./common/input-ref.directive";
import { AuMdInputComponent } from './au-md-input/au-md-input.component';
import { AuTabPanelComponent } from './au-tab-panel/au-tab-panel.component';
import { AuTabComponent } from './au-tab/au-tab.component';

@NgModule({
    declarations: [AuFaInputComponent, InputRefDirective, AuMdInputComponent, AuTabPanelComponent, AuTabComponent],
    imports: [
        CommonModule
    ],
    exports: [AuFaInputComponent, AuMdInputComponent, AuTabPanelComponent, AuTabComponent, InputRefDirective]
})
export class AuInputModule { }

