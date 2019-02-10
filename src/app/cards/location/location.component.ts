import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';

@Component({
  selector: 'aredn-location',
  templateUrl: './location.component.html'
})
export class LocationComponent extends DisposableComponent implements OnInit, OnDestroy {

  data: ArednApi.Location;

  constructor(private dataService: StatusPageDataService) {
    super();
  }

  ngOnInit() {
    this.dataService.get<ArednApi.Location>(StatusPageSections.location)
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
