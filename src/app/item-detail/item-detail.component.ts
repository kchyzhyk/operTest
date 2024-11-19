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
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const type = params.get('type') || 'movie';
      console.log('Type:', params.get('type'));
      if (id) {
        this.loadItemDetails(type, id);
      }
    });
  }

  loadItemDetails(type: string, id: string): void {
    this.apiService.getDetails(type, +id).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
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
