import { Component, OnInit } from '@angular/core';
import { ISubject } from './interface/ISubject';
import { SubjectService } from './service/sunject.service';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IPagination } from '../pagination/interface/IPagination';
import { PaginationComponent } from '../pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  imports: [DatePipe, MatPaginatorModule, PaginationComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

  subjects: ISubject[] = []
  pagination: IPagination<ISubject>

  constructor(
    private readonly subjectService: SubjectService,
    private readonly router: Router
  ) {
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

  selectSubject(id: number) {
    this.router.navigate(['/subjects', id, 'learn']);
  }

}
