import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
  @Input() item: any;
  @Output() closeDetail = new EventEmitter<void>();

  get genreNames(): string {
    return (
      this.item?.genres?.map((genre: any) => genre.name).join(', ') || 'N/A'
    );
  }

  onClose(): void {
    this.closeDetail.emit();
  }
}
