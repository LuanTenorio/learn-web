import { Component, OnInit } from '@angular/core';
import { ISubject } from './interface/ISubject';
import { SubjectService } from './service/sunject.service';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IPagination } from '../pagination/interface/IPagination';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-subject',
  imports: [DatePipe, MatPaginatorModule, PaginationComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

  subjects: ISubject[] = []
  pagination: IPagination<ISubject>

  constructor(private readonly subjectService: SubjectService) {
    this.pagination = {
      data: this.subjects,
      total: 0,
      limit: 10,
      page: 1,
    }
  }

  ngOnInit(): void {
    this.subjectService.pagination(this.pagination).subscribe(pagination => {
      this.subjects = pagination.data;
      this.pagination = pagination;
    });
  }

  onPageChange(event: any){
    this.pagination.page = event.page;
    this.subjectService.pagination(this.pagination).subscribe(pagination => {
      this.subjects = pagination.data;
      this.pagination = pagination;
    });
  }

}
