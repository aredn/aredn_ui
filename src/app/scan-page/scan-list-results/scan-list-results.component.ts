import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { ArednApi } from '../../../ArednApi';

@Component({
  selector: "aredn-scan-list-results",
  templateUrl: "./scan-list-results.component.html",
  styleUrls: ["./scan-list-results.component.scss"]
})
export class ScanListResultsComponent implements OnInit, OnChanges {
  orderByProperty = "quality";
  orderByDescending = true;

  @Input() results: ArednApi.ScanListResult[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.orderBy(this.orderByProperty, null, this.orderByDescending);
  }
  ngOnInit() { }

  orderBy(property: string, $event?: MouseEvent, descending?: boolean) {
    //if this is being called from an anchor tag, stop the page from refreshing
    if ($event) {
      $event.preventDefault();
    }

    if (typeof descending !== "undefined") {
      this.orderByDescending = descending;
    } else if (this.orderByProperty === property) {
      this.orderByDescending = !this.orderByDescending;
    } else {
      this.orderByDescending = true;
    }

    this.orderByProperty = property;
  }
}
