import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, mergeMap, filter } from 'rxjs/operators';
import { IDataLink } from './IDataLink';
import { TimedQueue } from './TimedQueue';

export class ReadOnlyDataService<TResponseShape> implements OnDestroy {

    /**
     * Configure buffer to drain ever 200ms or when buffer reaches 5 items.
     */
    private _requestBuffer = new TimedQueue<string>(100, 7);

    private _resolveSubject = new Subject<any>();
    /**
     *
     */
    constructor(
        private dataLink: IDataLink<TResponseShape>
    ) {
        this.startWatchingBuffer();
    }

    /**
     * Called by the constructor
     * to attach listener to watch buffer
     * to fire the requests when buffer capacity
     * or buffer time is reached
     */
    private startWatchingBuffer() {
        this._requestBuffer.valueChanges.pipe(
            mergeMap((values) => this.dataLink.resolveData(values)),
        ).subscribe(next => {
           this._resolveSubject.next(next);
       });
    }

    /**
     * Request data by a key and returns the repponse.
     *
     * EG: 'sysinfo'
     * @param key key of data to retrieve.
     */
    get<TValue>(key: string) {
        // Push the key into the request buffer.
        this._requestBuffer.buffer(key);

        // return the an observable which will
        // resolve the data value for th key
        return this._resolveSubject.pipe(
            map(getResponse => this.dataLink.selectResult(getResponse, key)),
            filter(r => !!r)
        ) as Observable<TValue>;
    }

    // protected abstract _resultSelector<TResponse>(data: any, key: string): TResponse;

    // /**
    //  * Derived class will implement the exact details for how
    //  * to retrieve data for the keys.
    //  * @param keys - keys to retrieve, will come from the request buffer.
    //  */
    // protected abstract _handleGet(keys: string[]): Observable<{[key: string]: any}>;

    ngOnDestroy() {
        this._resolveSubject.complete();
        this._requestBuffer.destroy();
    }

}
