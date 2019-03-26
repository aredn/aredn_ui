import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { ChartPageDataService } from "../chart-page-data.service";
import { ArednApi } from "src/ArednApi";
import { takeUntil, map } from "rxjs/operators";
import { DisposableComponent } from "../DisposableComponent";

@Component({
  selector: "aredn-charts-page",
  templateUrl: "./charts-page.component.html",
  styleUrls: ["./charts-page.component.scss"]
})
export class ChartsPageComponent extends DisposableComponent implements OnInit, OnDestroy {
  public results: ArednApi.SignalResult[] = [];
  public pollInterval: number = 1;
  public polling = false;

  private poll: Subscription;

  constructor(public chartService: ChartPageDataService) {
    super();
  }

  addResult(results: ArednApi.SignalResult[]) {
    this.results = this.results.concat(results);
  }

  getSignal(realtimeOrArchive: string = "realtime") {
    this.chartService.get<[ArednApi.SignalResult[]]>(realtimeOrArchive)
      .pipe(
        takeUntil(this.disposer),
        map(result => result[0])
      )
      .subscribe(
        result => { this.addResult(result); },
        error => console.error(error),
        () => {/*done*/ }
      );
  }

  ngOnInit() {
    //gets some historical data to start with
    this.getSignal("archive");
  }

  onStartPolling() {
    this.polling = true;
    this.poll = interval(this.pollInterval)
      .pipe(takeUntil(this.disposer))
      .subscribe(() => {
        this.getSignal("realtime");
      });
  }

  onStopPolling() {
    this.polling = false;
    this.poll.unsubscribe();
  }

}