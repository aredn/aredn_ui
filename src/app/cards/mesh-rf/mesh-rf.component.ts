import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StatusPageSections } from '../../constants';
import { DisposableComponent } from '../../DisposableComponent';
import { StatusPageDataService } from '../../status-page-data.service';
import { ArednApi } from '../../../ArednApi';
@Component({
  selector: 'aredn-mesh-rf',
  templateUrl: './mesh-rf.component.html'
})
export class MeshRfComponent extends DisposableComponent implements OnInit, OnDestroy {

  data: ArednApi.MeshRf;

  constructor(private dataService: StatusPageDataService) {
    super();
  }

  ngOnInit() {
    this.dataService.get<ArednApi.MeshRf>(StatusPageSections.meshrf)
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
