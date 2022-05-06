import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AuTabComponent } from '../au-tab/au-tab.component';

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['./au-tab-panel.component.scss']
})
export class AuTabPanelComponent implements OnInit, AfterContentInit {

  @ContentChildren(AuTabComponent) tabs: QueryList<AuTabComponent>;

  @Input() headerTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(t => t.selected);
    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }
    console.log(this.tabs);
  }

  selectTab(tab: AuTabComponent) {
    this.tabs.forEach(t => t.selected = false);
    tab.selected = true;
  }

  get tabsContext() {
    return { tabs: this.tabs };
  }
}
