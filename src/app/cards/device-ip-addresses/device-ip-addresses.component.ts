import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';
@Component({
  selector: 'aredn-device-ip-addresses',
  templateUrl: './device-ip-addresses.component.html'
})
export class DeviceIpAddressesComponent extends DisposableComponent implements OnInit, OnDestroy {

  data: ArednApi.IPAddresses;

  constructor(private dataService: StatusPageDataService) {
    super();
  }

  ngOnInit() {
    this.dataService.get<ArednApi.IPAddresses>(StatusPageSections.ip)
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
