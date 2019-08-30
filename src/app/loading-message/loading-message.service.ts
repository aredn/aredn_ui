import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Used to determine if an AJAX request is in flight or not */
@Injectable({
    providedIn: 'root'
})
export class LoadingMessageService {

    private loadingSubject = new Subject<boolean>();


    /** When true loadingSubject.next will never be called */
    private off = false;

    /**
     * Read only property to
     * determine if the service is ignoreing the requests or not.
     */
    get isIgnoring() {
        return this.off;
    }


    /**
     * Async observable that indicates if something (like an http request)
     * is currently in progress.
     */
    isLoading = this.loadingSubject.asObservable();

    /**
     * When called, this will notifiy subscribers
     * that something is loading.
     */
    startLoading() {
        // Loading indicator has been set to 'off'
        // no events are triggered.
        if (this.off === false) {
            this.loadingSubject.next(true);
        }
    }

    /**
     * Called when nothing is loading
     */
    stopLoading() {
        this.loadingSubject.next(false);
    }

    /** Sets loading subject to false
     *  and will not prevent subject from
     *  being triggered until unignore is called.
     *
     * This method is useful for disabling the loading indicator
     * on chatting requests like Http Polling.
     */
    ignore() {
        this.off = true;
        this.stopLoading();
    }

    /** Allows the loading service
     * to trigger the loading indicator
     * if ignore had been called.
     */
    unignore() {
        this.off = false;
    }
}
