import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { combineLatest as observableCombineLatest } from 'rxjs';
import { DisposableComponent } from '../DisposableComponent';
import { StatusPageDataService } from '../status-page-data.service';
import { StatusPageSections } from '../constants';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'aredn-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent extends DisposableComponent implements OnInit, OnDestroy {

  /**
   * Data is a union of Sysinfo and location
   */
  data: ArednApi.SysInfo & ArednApi.Location;

  constructor(
    private dataService: StatusPageDataService,
    private router: Router,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.router.events
    .pipe(
      takeUntil(this.disposer)
    )
    .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.cd.markForCheck();
        }
    });

    observableCombineLatest(
      this.dataService.get<ArednApi.Location>(StatusPageSections.location),
      this.dataService.get<ArednApi.SysInfo>(StatusPageSections.sysinfo)
    )
      .pipe(
        // Stops listening when component is destroyed
        // disposer is defined in BaseClass DisposableCompoennt
        takeUntil(this.disposer)
      )
      .subscribe(
        ([memory, storage]) => this.data = { ...memory, ...storage },
        error => console.error(error),
        () => {/*done*/ }
      );

  }

}
