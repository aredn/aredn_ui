import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class DisposableComponent implements OnDestroy {
    protected disposer = new Subject();

    ngOnDestroy() {
        this.disposer.next();
        this.disposer.complete();
    }
}
