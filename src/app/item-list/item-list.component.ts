import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() type: string = '';
  @Input() items: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  @Output() detailsRequested = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    if (this.isLoading) return;
    this.isLoading = true;
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

  navigateToDetails(item: any): void {
    console.log(item);
    const type = item.name ? 'tv' : 'movie';
    this.router.navigate(['/item', type, item.id]);
  }
}
