import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NewModel } from '../../../models';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnChanges {
  @Input() items: NewModel[];
  @Input() maxItems = 3;
  @Input() showActions = false;
  @Output() editItem = new EventEmitter<NewModel>();
  @Output() deleteItem = new EventEmitter<number>();

  public visibleItems: NewModel[];
  public currentFirstItem = 0;

  ngOnInit(): void {
    this.SetVisibleItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['items']?.currentValue) {
      this.SetVisibleItems();
    }
  }

  showPreviousItem() {
    if (this.canGoBack()) {
      this.currentFirstItem--;
      this.SetVisibleItems();
    }
  }

  showNextItem() {
    if (this.canGoForward()) {
      this.currentFirstItem++;
      this.SetVisibleItems();
    }
  }

  public SetVisibleItems() {
    const endIndex = this.currentFirstItem + this.maxItems;
    this.visibleItems = this.items?.slice(this.currentFirstItem, endIndex);
  }

  public canGoBack(): boolean {
    return this.currentFirstItem > 0;
  }

  public canGoForward(): boolean {
    return this.currentFirstItem + this.maxItems < this.items.length;
  }
}
