import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-element-selection',
  templateUrl: './data-element-selection.component.html',
  styleUrls: ['./data-element-selection.component.scss']
})
export class DataElementSelectionComponent implements OnInit {
  @Input() availableReports: Array<any>;
  @Input() selectedReports: Array<any>;
  @Output() selectedEntityEventEmitter = new EventEmitter();
  action: string;
  searchString: string;
  tempReports: any[] = [];
  isLoading = true;

  constructor() {}

  ngOnInit() {}

  onDoubleClickSelect(report: any, action: string) {
    // this.tempReports = [];
    // const mReports: Report | [] = report ? report : [];
    // const mSelectedReports: Array<Report> = this.selectedReports
    //   ? [...this.selectedReports]
    //   : [];
    // const mAvailableReports: Array<Report> = this.availableReports
    //   ? [...this.availableReports]
    //   : [];
    // this.selectedReports = _.unionBy(mSelectedReports, [mReports], 'id');
    // this.selectedEntityEventEmitter.emit(this.selectedReports);
    // this.availableReports = getSortedList(
    //   _.uniqBy(_.pull(mAvailableReports, report), 'id'),
    //   'name'
    // );
  }

  onDoubleClickDeSelect(report: any, action: string) {
    // this.tempReports = [];
    // const mReports: Report | [] = report ? report : [];
    // const mSelectedReports: Array<Report> = this.selectedReports
    //   ? [...this.selectedReports]
    //   : [];
    // const mAvailableReports: Array<Report> = this.availableReports
    //   ? [...this.availableReports]
    //   : [];
    // this.availableReports = getSortedList(
    //   _.unionBy(mAvailableReports, [mReports], 'id'),
    //   'name'
    // );
    // this.selectedReports = _.uniqBy(_.pull(mSelectedReports, report), 'id');
  }

  onClickSelect(report: any, action: string) {
    // this.action = action;
    // const mReports: Report | [] = report ? report : [];
    // this.tempReports = [];
    // this.tempReports = _.unionBy(this.tempReports, [mReports], 'id');
  }

  onClickDeSelect(report: any, action: string) {
    // this.action = action;
    // const mReports: Report | [] = report ? report : [];
    // this.tempReports = [];
    // this.tempReports = _.unionBy(this.tempReports, [mReports], 'id');
  }

  toggleTempValues() {
    // const action: string = this.action;
    // if (action === 'select') {
    //   const mSelectedReports: Array<Report> = this.selectedReports
    //     ? [...this.selectedReports]
    //     : [];
    //   const mAvailableReports: Array<Report> = this.availableReports
    //     ? [...this.availableReports]
    //     : [];
    //   this.selectedReports = _.unionBy(mSelectedReports, this.tempReports);
    //   this.selectedEntityEventEmitter.emit(this.selectedReports);
    //   this.availableReports = _.pull(
    //     mAvailableReports,
    //     _.head(this.tempReports)
    //   );

    //   this.tempReports = [];
    // } else if (action === 'deselect') {
    //   const mAvailableReports: Array<Report> = this.availableReports
    //     ? [...this.availableReports]
    //     : [];
    //   const mSelectedReports: Array<Report> = this.selectedReports
    //     ? [...this.selectedReports]
    //     : [];
    //   (this.availableReports = _.unionBy(mAvailableReports, this.tempReports)),
    //     (this.selectedReports = _.pull(
    //       mSelectedReports,
    //       _.head(this.tempReports)
    //     ));
    //   this.tempReports = [];
    // }
  }

  assignAll() {
    // const mAvailableReports = this.availableReports
    //   ? [...this.availableReports]
    //   : [];
    // const mSelectedReports = this.selectedReports
    //   ? [...this.selectedReports]
    //   : [];
    // this.availableReports = [];
    // this.selectedReports = _.uniqBy(
    //   _.unionBy(mAvailableReports, mSelectedReports, 'id'),
    //   'id'
    // );
    // this.selectedEntityEventEmitter.emit(this.selectedReports);
  }

  removeAll() {
    // const mAvailableReports = this.availableReports
    //   ? [...this.availableReports]
    //   : [];
    // const mSelectedReports = this.selectedReports
    //   ? [...this.selectedReports]
    //   : [];
    // this.selectedReports = [];
    // this.availableReports = _.uniqBy(
    //   _.unionBy(mAvailableReports, mSelectedReports, 'id'),
    //   'id'
    // );
  }
}
