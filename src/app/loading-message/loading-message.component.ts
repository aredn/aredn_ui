import { Component } from '@angular/core';
import { LoadingMessageService } from './loading-message.service';

/**
 * Component is shown when there is something (normally ajax request)
 * loading.
 */
@Component({
  selector: 'aredn-loading-message',
  templateUrl: `./loading-message.component.html`,
})
export class LoadingMessageComponent {

    /**
     * Observable used to toggle loading message
     * in the UI.
     */
    isLoading$ = this.loadingMessageService.isLoading;


    constructor(private loadingMessageService: LoadingMessageService) {
    }

}
