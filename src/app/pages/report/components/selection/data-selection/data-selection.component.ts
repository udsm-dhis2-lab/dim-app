import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Data } from '../../../models/data.model';
import { getSortedList } from 'src/app/shared/helpers/get-sorted-list.helper';

@Component({
  selector: 'app-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  @Input() availableDatas: Array<any>;
  @Input() selectedDatas: Array<any>;
  @Output() selectedEntityEventEmitter = new EventEmitter();
  action: string;
  searchString: string;
  tempDatas: any[] = [];
  isLoading = true;

  constructor() {}

  ngOnInit() {}

  onDoubleClickSelect(report: any, action: string) {
    this.tempDatas = [];
    const mDatas: Data | [] = report ? report : [];
    const mSelectedReports: Array<Data> = this.selectedDatas
      ? [...this.selectedDatas]
      : [];
    const mAvailableDatas: Array<Data> = this.availableDatas
      ? [...this.availableDatas]
      : [];
    this.selectedDatas = _.unionBy(mSelectedReports, [mDatas], 'id');
    this.selectedEntityEventEmitter.emit(this.selectedDatas);
    this.availableDatas = getSortedList(
      _.uniqBy(_.pull(mAvailableDatas, report), 'id'),
      'name'
    );
  }

  onDoubleClickDeSelect(report: any, action: string) {
    this.tempDatas = [];
    const mDatas: Data | [] = report ? report : [];
    const mSelectedDatas: Array<Data> = this.selectedDatas
      ? [...this.selectedDatas]
      : [];
    const mAvailableDatas: Array<Data> = this.availableDatas
      ? [...this.availableDatas]
      : [];
    this.availableDatas = getSortedList(
      _.unionBy(mAvailableDatas, [mDatas], 'id'),
      'name'
    );
    this.selectedDatas = _.uniqBy(_.pull(mSelectedDatas, report), 'id');
  }

  onClickSelect(report: any, action: string) {
    this.action = action;
    const mReports: Data | [] = report ? report : [];
    this.tempDatas = [];
    this.tempDatas = _.unionBy(this.tempDatas, [mReports], 'id');
  }

  onClickDeSelect(report: any, action: string) {
    this.action = action;
    const mReports: Data | [] = report ? report : [];
    this.tempDatas = [];
    this.tempDatas = _.unionBy(this.tempDatas, [mReports], 'id');
  }

  toggleTempValues() {
    const action: string = this.action;
    if (action === 'select') {
      const mSelectedDatas: Array<Data> = this.selectedDatas
        ? [...this.selectedDatas]
        : [];
      const mAvailableDatas: Array<Data> = this.availableDatas
        ? [...this.availableDatas]
        : [];
      this.selectedDatas = _.unionBy(mSelectedDatas, this.tempDatas);
      this.selectedEntityEventEmitter.emit(this.selectedDatas);
      this.availableDatas = _.pull(mAvailableDatas, _.head(this.tempDatas));

      this.tempDatas = [];
    } else if (action === 'deselect') {
      const mAvailableDatas: Array<Data> = this.availableDatas
        ? [...this.availableDatas]
        : [];
      const mSelectedDatas: Array<Data> = this.selectedDatas
        ? [...this.selectedDatas]
        : [];
      (this.availableDatas = _.unionBy(mAvailableDatas, this.tempDatas)),
        (this.selectedDatas = _.pull(mSelectedDatas, _.head(this.tempDatas)));
      this.tempDatas = [];
    }
  }

  assignAll() {
    const mAvailableDatas = this.availableDatas ? [...this.availableDatas] : [];
    const mSelectedDatas = this.selectedDatas ? [...this.selectedDatas] : [];
    this.availableDatas = [];
    this.selectedDatas = _.uniqBy(
      _.unionBy(mAvailableDatas, mSelectedDatas, 'id'),
      'id'
    );
    this.selectedEntityEventEmitter.emit(this.selectedDatas);
  }

  removeAll() {
    const mAvailableDatas = this.availableDatas ? [...this.availableDatas] : [];
    const mSelectedDatas = this.selectedDatas ? [...this.selectedDatas] : [];
    this.selectedDatas = [];
    this.availableDatas = _.uniqBy(
      _.unionBy(mAvailableDatas, mSelectedDatas, 'id'),
      'id'
    );
  }
}
