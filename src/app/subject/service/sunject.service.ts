import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../config/environment.dev';
import { ISubject } from '../interface/ISubject';
import { IPagination } from '../../pagination/interface/IPagination';
import { createHttpPaginationParams } from '../../pagination/util/createHttpPaginationParams';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private readonly path = "/subjects"
  private readonly apiUrl = `${environment.apiUrl}${this.path}`;

  constructor(private readonly http: HttpClient) {}

  pagination(pagination: IPagination<ISubject>) {
    const params = createHttpPaginationParams(pagination);
    return this.http.get<IPagination<ISubject>>(this.apiUrl, { params });
  }

}
