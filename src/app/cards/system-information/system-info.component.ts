import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';

@Component({
  selector: 'aredn-system-info',
  templateUrl: './system-info.component.html'

})
export class SystemInfoComponent extends DisposableComponent implements OnInit, OnDestroy {

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
