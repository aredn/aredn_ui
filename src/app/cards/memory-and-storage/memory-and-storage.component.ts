import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest as observableCombineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';
import { ArednApi } from '../../../ArednApi';
@Component({
  selector: 'aredn-memory-and-storage',
  templateUrl: './memory-and-storage.component.html'
})
export class MemoryAndStorageComponent extends DisposableComponent implements OnInit, OnDestroy {

  // https://codingblast.com/typescript-intersection-types/
  data: ArednApi.Memory & ArednApi.Storage;

  constructor(private dataService: StatusPageDataService) {
    super();
  }

  ngOnInit() {

    // tslint:disable-next-line:max-line-length
    // https://scotch.io/tutorials/rxjs-operators-for-dummies-forkjoin-zip-combinelatest-withlatestfrom#toc-combinelatest-the-go-dutch-operator

    observableCombineLatest(
      this.dataService.get<ArednApi.Memory>(StatusPageSections.memory),
      this.dataService.get<ArednApi.Storage>(StatusPageSections.storage)
    )
      .pipe(
        takeUntil(this.disposer)
      )
      .subscribe(
        ([memory, storage]) => this.data = { ...memory, ...storage },
        error => console.error(error),
        () => {/*done*/ }
      );
  }

}
