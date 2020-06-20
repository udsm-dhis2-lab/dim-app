import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DIMBatch } from 'src/app/pages/batch/models/batch.model';
import * as _ from 'lodash';
import { getSortedList } from 'src/app/shared/helpers/get-sorted-list.helper';
@Component({
  selector: 'app-batch-selection',
  templateUrl: './batch-selection.component.html',
  styleUrls: ['./batch-selection.component.scss'],
})
export class BatchSelectionComponent implements OnInit {
  @Input() availableBatches: Array<any>;
  @Input() selectedBatches: Array<any>;
  @Output() selectedBatchEventEmitter = new EventEmitter();
  action: string;
  searchString: string;
  tempBatches: any[] = [];
  isLoading = true;
  loaded = false;

  constructor() {}

  ngOnInit() {
    if (this.availableBatches) {
      this.loaded = true;
    }
  }

  onDoubleClickSelect(batch: DIMBatch, action: string) {
    this.loaded = true;
    this.tempBatches = [];
    const mBatches: DIMBatch | [] = batch ? batch : [];
    const mSelectedReports: Array<DIMBatch> = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    const mAvailableReports: Array<DIMBatch> = this.availableBatches
      ? [...this.availableBatches]
      : [];
    this.selectedBatches = _.unionBy(mSelectedReports, [mBatches], 'id');
    this.selectedBatchEventEmitter.emit(this.selectedBatches);
    this.availableBatches = getSortedList(
      _.uniqBy(_.pull(mAvailableReports, batch), 'id'),
      'name'
    );
  }

  onDoubleClickDeSelect(report: any, action: string) {
    this.tempBatches = [];
    const mBatches: DIMBatch | [] = report ? report : [];
    const mSelectedReports: Array<DIMBatch> = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    const mAvailableReports: Array<DIMBatch> = this.availableBatches
      ? [...this.availableBatches]
      : [];
    this.availableBatches = getSortedList(
      _.unionBy(mAvailableReports, [mBatches], 'id'),
      'name'
    );
    this.selectedBatches = _.uniqBy(_.pull(mSelectedReports, report), 'id');
  }

  onClickSelect(report: any, action: string) {
    this.loaded = true;
    this.action = action;
    const mBatches: DIMBatch | [] = report ? report : [];
    this.tempBatches = [];
    this.tempBatches = _.unionBy(this.tempBatches, [mBatches], 'id');
  }

  onClickDeSelect(report: any, action: string) {
    this.action = action;
    const mBatches: DIMBatch | [] = report ? report : [];
    this.tempBatches = [];
    this.tempBatches = _.unionBy(this.tempBatches, [mBatches], 'id');
  }

  toggleTempValues() {
    const action: string = this.action;
    if (action === 'select') {
      const mSelectedReports: Array<DIMBatch> = this.selectedBatches
        ? [...this.selectedBatches]
        : [];
      const mAvailableReports: Array<DIMBatch> = this.availableBatches
        ? [...this.availableBatches]
        : [];
      this.selectedBatches = _.unionBy(mSelectedReports, this.tempBatches);
      this.selectedBatchEventEmitter.emit(this.selectedBatches);
      this.availableBatches = _.pull(
        mAvailableReports,
        _.head(this.tempBatches)
      );
      this.tempBatches = [];
    } else if (action === 'deselect') {
      const mAvailableReports: Array<DIMBatch> = this.availableBatches
        ? [...this.availableBatches]
        : [];
      const mSelectedReports: Array<DIMBatch> = this.selectedBatches
        ? [...this.selectedBatches]
        : [];
      (this.availableBatches = _.unionBy(mAvailableReports, this.tempBatches)),
        (this.selectedBatches = _.pull(
          mSelectedReports,
          _.head(this.tempBatches)
        ));
      this.tempBatches = [];
    }
  }

  assignAll() {
    const mAvailableReports = this.availableBatches
      ? [...this.availableBatches]
      : [];
    const mSelectedReports = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    this.availableBatches = [];
    this.selectedBatches = _.uniqBy(
      _.unionBy(mAvailableReports, mSelectedReports, 'id'),
      'id'
    );
    this.selectedBatchEventEmitter.emit(this.selectedBatches);
  }

  removeAll() {
    const mAvailableReports = this.availableBatches
      ? [...this.availableBatches]
      : [];
    const mSelectedReports = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    this.selectedBatches = [];
    this.availableBatches = _.uniqBy(
      _.unionBy(mAvailableReports, mSelectedReports, 'id'),
      'id'
    );
  }
}
