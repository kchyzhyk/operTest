import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ItemCardComponent } from "../item-card/item-card.component";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, ItemCardComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    const observer = {
      next: (response: any) => {
        this.items = [...this.items, ...response.results];
        this.currentPage += 1;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading items:', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Loading items completed.');
      },
    };
  }

  loadMoreItems(): void {
    const scrollContainer = document.querySelector('.item-list');
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollPosition =
        scrollContainer.scrollTop + scrollContainer.clientHeight;

      if (scrollHeight - scrollPosition < 100) {
        this.loadItems();
      }
    }
  }
}
