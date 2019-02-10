import { Subject } from 'rxjs';
export class TimedQueue<T> {
    /**
     * Current items in queue.
     */
    private _currentQueue: T[] = [];

    /**
     * Handle from the window object
     * that is used to stop the
     * scheduled internal function.
     */
    private _intervalHandle: number;

    /**
     *
     */
    private subject = new Subject<T[]>();

    constructor(drainEveryMs: number, private drainAt?: number) {
        if (drainEveryMs < 50) {
            console.warn('Setting below 50ms can have negative performance impacts.');
        }
        this._intervalHandle = window.setInterval(() => this.drain(), drainEveryMs);
    }
    valueChanges = this.subject.asObservable();

    /**
     * Adds data to the buffer, ignores data that is
     * not unique using by an equals comparision.
     * @param item item to push into buffer.
     */
    buffer(item: T) {
        if (!this._currentQueue.includes(item)) {
            this._currentQueue.push(item);
        }
        if (this.drainAt && this._currentQueue.length >= this.drainAt) {
            this.drain();
        }
    }

    /**
     * Drains the queue and emits valueChanges
     */
    drain() {
        if (this._currentQueue.length > 0) {
            const queueCopy = this._currentQueue.map(v => v);
            this.subject.next(queueCopy);
            this._currentQueue = [];
        }
    }

    /**
     * Destroys the buffer.
     * Important this is called to release resources used by the buffer.
     */
    destroy() {
        window.clearInterval(this._intervalHandle);
        this.subject.complete();
    }
}
