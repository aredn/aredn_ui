import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadOnlyDataService } from './core/readonly-data.service';
import { ApiDataLink } from './data-links/api-data-link';
import { ArednApi } from '../ArednApi';

@Injectable({
  providedIn: 'root'
})
export class ChartPageDataService extends ReadOnlyDataService<ArednApi.ApiResponse> {
  constructor(http: HttpClient) {
    super(new ApiDataLink('chart', http));
  }
}