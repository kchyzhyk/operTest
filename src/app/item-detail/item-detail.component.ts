import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  @Input() item: any;
  @Output() closeDetail = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.loadItemDetails(itemId);
    });
  }

  loadItemDetails(id: string): void {
    this.apiService.getDetails('movie', +id).subscribe((data) => {
      this.item = data;
    });
  }

  get genreNames(): string {
    return (
      this.item?.genres?.map((genre: any) => genre.name).join(', ') || 'N/A'
    );
  }

  onClose(): void {
    this.closeDetail.emit();
  }
}
