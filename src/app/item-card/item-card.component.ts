import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() item: any;
  @Output() detailsRequested = new EventEmitter<any>();
  onDetailsClick(): void {
    this.detailsRequested.emit(this.item);
  }
}
