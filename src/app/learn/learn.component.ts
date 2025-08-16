import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IPagination } from '../pagination/interface/IPagination';
import { PaginationComponent } from '../pagination/pagination.component';
import { LearnService } from './service/learn.service';
import { ILearn } from './interface/ILearn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn',
  imports: [DatePipe, MatPaginatorModule, PaginationComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent implements OnInit {

    id: number = 0;
    learns: ILearn[] = []
    pagination: IPagination<ILearn>

    constructor(
        private readonly learnService: LearnService,
        private route: ActivatedRoute
    ) {
        this.pagination = {
        data: this.learns,
        total: 0,
        limit: 10,
        page: 1,
        }
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.learnService.pagination(this.id, this.pagination).subscribe(pagination => {
            this.learns = pagination.data;
            this.learns.forEach(this.calculateTotalTime);
            this.pagination = pagination;
            console.log(this.learns);
        });
    }

    onPageChange(event: any){
        this.pagination.page = event.page;
        this.learnService.pagination(this.id, this.pagination).subscribe(pagination => {
            this.learns = pagination.data;
            this.learns.forEach(this.calculateTotalTime);
            this.pagination = pagination;
            console.log(this.learns);
        });

    }

    calculateTotalTime(learn: ILearn){
        if(!learn.end) learn.end = new Date();
        if(typeof learn.start == "string") learn.start = new Date(learn.start);

        const durationWithoutPause = learn.end.getTime() - learn.start.getTime();
        const pauseInMs = learn.pauseTime * 1000;
        learn.totalTime = durationWithoutPause - pauseInMs;
    }

}
