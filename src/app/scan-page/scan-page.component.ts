import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { takeUntil, map, startWith } from "rxjs/operators";

import { LoadingMessageService } from "../loading-message/loading-message.service";
import { ScanPageDataService } from "../scan-page-data.service";
import { DisposableComponent } from "../DisposableComponent";

@Component({
  selector: "aredn-scan-page",
  templateUrl: "./scan-page.component.html",
  // TODO: I think this is the default?
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./scan-page.component.scss"]
})
export class ScanPageComponent extends DisposableComponent
  implements OnInit, OnDestroy {
  scanning = false;
  autoScanEnabled = false;

  private autoScan: Subscription;
  private autoScanInterval = 6000;
  private lastScanTime: Date;
  // TODO: Create an interface for what the results are?
  private _results: {} = {};

  // Results are stored by mac for easy updating
  set results(results: any[]) {
    results.forEach(result => (this._results[result.bssid] = result));
  }
  get results() {
    return Object.values(this._results);
  }

  constructor(
    private scanService: ScanPageDataService,
    private loadingMessageService: LoadingMessageService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  filterByActive() {
    return this.results.filter(result => result.seen === this.lastScanTime);
  }

  filterByInactive() {
    return this.results.filter(result => result.seen !== this.lastScanTime);
  }

  ngOnInit() {
    // Disable the loading message service
    // to prevent the spinner from showing up
    // on this page
    this.loadingMessageService.ignore();

    this.scan();

    // Disposer is called when component is destroyed
    // at this point we can turn back on the spinner
    this.disposer.subscribe(() => {
      this.loadingMessageService.unignore();
    });

  }

  onAutoScanDisabled() {
    this.autoScanEnabled = false;
    this.autoScan.unsubscribe();
  }

  onAutoScanEnabled() {
    this.autoScanEnabled = true;
    this.scan();
    this.autoScan = interval(this.autoScanInterval)
      .pipe(
        takeUntil(this.disposer)
      )
      .subscribe(() => {
        this.scan();
      });
  }

  onScanResultsReceived(results: any[]) {
    this.results = results;
    this.scanning = false;
    this.cd.markForCheck();
  }

  scan() {
    this.scanning = true;

    this.scanService
      .get<any[]>("scanlist")
      .pipe(
        startWith([]),
        takeUntil(this.disposer),
        map(this.timestampResults, this)
      )
      .subscribe(
        results => {
          this.onScanResultsReceived(results);
        },
        error => console.error(error),
        () => {
          /*done*/
        }
      );
  }

  // Timestamp each result as we receive it
  // this is how we know which APs are active/inactive
  /**
   *
   * @param results scan results
   */
  timestampResults(results: any[]): any[] {
    this.lastScanTime = new Date();
    results.forEach(result => (result.seen = this.lastScanTime));
    return results;
  }
}
