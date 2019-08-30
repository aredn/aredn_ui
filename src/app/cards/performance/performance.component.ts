import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';
import { ArednApi } from '../../../ArednApi';
@Component({
  selector: 'aredn-performance',
  templateUrl: './performance.component.html'

})
export class PerformanceComponent extends DisposableComponent implements OnInit, OnDestroy {

  data: ArednApi.SysInfo;

  constructor(private dataService: StatusPageDataService) {
    super();
  }

  ngOnInit() {

    this.dataService.get<ArednApi.SysInfo>(StatusPageSections.sysinfo)
      .pipe(
        takeUntil(this.disposer)
      )
      .subscribe(
        result => this.data = result,
        error => console.error(error),
        () => {/*done*/ }
      );
  }

}
