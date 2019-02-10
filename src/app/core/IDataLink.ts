import { Observable } from 'rxjs';
export interface IDataLink<T> {
    selectResult<TResponse>(input: T, key: string): TResponse;
    resolveData(keys: string[]): Observable<T>;
}
