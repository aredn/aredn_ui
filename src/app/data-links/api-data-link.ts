import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataLink } from '../core/IDataLink';

/**
 * Data link implemnations using HTTP to access to the Node's API service.
 */
export class ApiDataLink implements IDataLink<ArednApi.ApiResponse> {
    /**
     *
     */
    constructor(private page: string, private http: HttpClient) {
    }

    selectResult<TResponse>(input: ArednApi.ApiResponse, key: string): TResponse {
        if (input && input.pages && input.pages[this.page] && input.pages[this.page][key]) {
            return input['pages'][this.page][key] as TResponse;
        }
        return null;
    }
    /**
     * Handles fetching data
     */
    resolveData(keys: string[]): Observable<ArednApi.ApiResponse> {
        return this.http.get<ArednApi.ApiResponse>(`/cgi-bin/api`, {
            params: {
                status: keys.join(',')
            }
        });
    }


}
