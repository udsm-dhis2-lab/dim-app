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
    const mSelectedBatches: Array<DIMBatch> = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    const mAvailableBatches: Array<DIMBatch> = this.availableBatches
      ? [...this.availableBatches]
      : [];
    this.selectedBatches = _.unionBy(mSelectedBatches, [mBatches], 'id');
    this.selectedBatchEventEmitter.emit(this.selectedBatches);
    this.availableBatches = getSortedList(
      _.uniqBy(_.pull(mAvailableBatches, batch), 'id'),
      'name'
    );
  }

  onDoubleClickDeSelect(batch: DIMBatch, action: string) {
    this.tempBatches = [];
    const mBatches: DIMBatch | [] = batch ? batch : [];
    const mSelectedBatches: Array<DIMBatch> = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    const mAvailableBatches: Array<DIMBatch> = this.availableBatches
      ? [...this.availableBatches]
      : [];
    this.availableBatches = getSortedList(
      _.unionBy(mAvailableBatches, [mBatches], 'id'),
      'name'
    );
    this.selectedBatches = _.uniqBy(_.pull(mSelectedBatches, batch), 'id');
    this.selectedBatchEventEmitter.emit(this.selectedBatches);
  }

  onClickSelect(batch: any, action: string) {
    this.loaded = true;
    this.action = action;
    const mBatches: DIMBatch | [] = batch ? batch : [];
    this.tempBatches = [];
    this.tempBatches = _.unionBy(this.tempBatches, [mBatches], 'id');
  }

  onClickDeSelect(batch: any, action: string) {
    this.action = action;
    const mBatches: DIMBatch | [] = batch ? batch : [];
    this.tempBatches = [];
    this.tempBatches = _.unionBy(this.tempBatches, [mBatches], 'id');
  }

  toggleTempValues() {
    const action: string = this.action;
    if (action === 'select') {
      const mSelectedBatches: Array<DIMBatch> = this.selectedBatches
        ? [...this.selectedBatches]
        : [];
      const mAvailableBatches: Array<DIMBatch> = this.availableBatches
        ? [...this.availableBatches]
        : [];
      this.selectedBatches = _.unionBy(mSelectedBatches, this.tempBatches);
      this.selectedBatchEventEmitter.emit(this.selectedBatches);
      this.availableBatches = _.pull(
        mAvailableBatches,
        _.head(this.tempBatches)
      );
      this.tempBatches = [];
    } else if (action === 'deselect') {
      const mAvailableBatches: Array<DIMBatch> = this.availableBatches
        ? [...this.availableBatches]
        : [];
      const mSelectedBatches: Array<DIMBatch> = this.selectedBatches
        ? [...this.selectedBatches]
        : [];
      (this.availableBatches = _.unionBy(mAvailableBatches, this.tempBatches)),
        (this.selectedBatches = _.pull(
          mSelectedBatches,
          _.head(this.tempBatches)
        ));
      this.tempBatches = [];
    }
  }

  assignAll() {
    const mAvailableBatches = this.availableBatches
      ? [...this.availableBatches]
      : [];
    const mSelectedBatches = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    this.availableBatches = [];
    this.selectedBatches = _.uniqBy(
      _.unionBy(mAvailableBatches, mSelectedBatches, 'id'),
      'id'
    );
    this.selectedBatchEventEmitter.emit(this.selectedBatches);
  }

  removeAll() {
    const mAvailableBatches = this.availableBatches
      ? [...this.availableBatches]
      : [];
    const mSelectedBatches = this.selectedBatches
      ? [...this.selectedBatches]
      : [];
    this.selectedBatches = [];
    this.availableBatches = _.uniqBy(
      _.unionBy(mAvailableBatches, mSelectedBatches, 'id'),
      'id'
    );
  }
}
