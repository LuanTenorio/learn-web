import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment.dev';
import { IPagination } from '../../pagination/interface/IPagination';
import { createHttpPaginationParams } from '../../pagination/util/createHttpPaginationParams';
import { ILearn } from '../interface/ILearn';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  private readonly path = "/learns"
  private readonly apiUrl = `${environment.apiUrl}${this.path}`;

  constructor(private readonly http: HttpClient) {}

  pagination(subjectId: number, pagination: IPagination<ILearn>) {
    const params: ReturnType<typeof createHttpPaginationParams> & { subjectId?: number } = createHttpPaginationParams(pagination);
    params.subjectId = subjectId;

    return this.http.get<IPagination<ILearn>>(this.apiUrl, { params });
  }

}
