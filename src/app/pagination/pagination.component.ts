import { Component, input, output } from '@angular/core';
import { IPagination } from './interface/IPagination';
import { IChangePageEvent } from './interface/IChangeEvent';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  pagination = input<IPagination<unknown>>({
    data: [],
    total: 0,
    limit: 10,
    page: 1
  })

  change = output<IChangePageEvent>()

  getTotalPages() {
    return Math.ceil(this.pagination().total / this.pagination().limit);
  }

  nextPage() {
    if (this.pagination().page >= this.getTotalPages()) 
      return

    this.pagination().page++
    this.change.emit({ page: this.pagination().page })
  }

  previousPage() {
    if (this.pagination().page <= 1) 
      return

    this.pagination().page--
    this.change.emit({ page: this.pagination().page })
  }

}
