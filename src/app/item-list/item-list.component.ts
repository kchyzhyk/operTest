import { Component } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  onScroll(): void {
  if (this.viewport.measureScrollOffset('bottom') < 100) {
    this.loadMoreItems();
  }
}

}





