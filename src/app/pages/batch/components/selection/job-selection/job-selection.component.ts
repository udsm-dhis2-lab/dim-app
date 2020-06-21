import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DIMJob } from 'src/app/pages/job/models/job.model';
import { getSortedList } from 'src/app/shared/helpers/get-sorted-list.helper';
import * as _ from 'lodash';
@Component({
  selector: 'app-job-selection',
  templateUrl: './job-selection.component.html',
  styleUrls: ['./job-selection.component.scss'],
})
export class JobSelectionComponent implements OnInit {
  @Input() availableJobs: Array<any>;
  @Input() selectedJobs: Array<any>;
  @Output() selectedJobsEventEmitter = new EventEmitter();
  action: string;
  searchString: string;
  tempJobs: any[] = [];
  isLoading = true;
  loaded = false;

  constructor() { }

  ngOnInit() {
    if (this.availableJobs) {
      this.loaded = true;
    }
  }

  onDoubleClickSelect(job: DIMJob, action: string) {
    this.loaded = true;
    this.tempJobs = [];
    const mJobs: DIMJob | [] = job ? job : [];
    const mSelectedJobs: Array<DIMJob> = this.selectedJobs
      ? [...this.selectedJobs]
      : [];
    const mAvailableJobs: Array<DIMJob> = this.availableJobs
      ? [...this.availableJobs]
      : [];
    this.selectedJobs = _.unionBy(mSelectedJobs, [mJobs], 'id');
    this.selectedJobsEventEmitter.emit(this.selectedJobs);
    this.availableJobs = getSortedList(
      _.uniqBy(_.pull(mAvailableJobs, job), 'id'),
      'name'
    );
  }

  onDoubleClickDeSelect(job: DIMJob, action: string) {
    this.tempJobs = [];
    const mJobs: DIMJob | [] = job ? job : [];
    const mSelectedJobs: Array<DIMJob> = this.selectedJobs
      ? [...this.selectedJobs]
      : [];
    const mAvailableJobs: Array<DIMJob> = this.availableJobs
      ? [...this.availableJobs]
      : [];
    this.availableJobs = getSortedList(
      _.unionBy(mAvailableJobs, [mJobs], 'id'),
      'name'
    );
    this.selectedJobs = _.uniqBy(_.pull(mSelectedJobs, job), 'id');
    this.selectedJobsEventEmitter.emit(this.selectedJobs);
  }

  onClickSelect(job: any, action: string) {
    this.loaded = true;
    this.action = action;
    const mJobs: DIMJob | [] = job ? job : [];
    this.tempJobs = [];
    this.tempJobs = _.unionBy(this.tempJobs, [mJobs], 'id');
  }

  onClickDeSelect(job: any, action: string) {
    this.action = action;
    const mJobs: DIMJob | [] = job ? job : [];
    this.tempJobs = [];
    this.tempJobs = _.unionBy(this.tempJobs, [mJobs], 'id');
  }

  toggleTempValues() {
    const action: string = this.action;
    if (action === 'select') {
      const mSelectedJobs: Array<DIMJob> = this.selectedJobs
        ? [...this.selectedJobs]
        : [];
      const mAvailableJobs: Array<DIMJob> = this.availableJobs
        ? [...this.availableJobs]
        : [];
      this.selectedJobs = _.unionBy(mSelectedJobs, this.tempJobs);
      this.selectedJobsEventEmitter.emit(this.selectedJobs);
      this.availableJobs = _.pull(mAvailableJobs, _.head(this.tempJobs));
      this.tempJobs = [];
    } else if (action === 'deselect') {
      const mAvailableJobs: Array<DIMJob> = this.availableJobs
        ? [...this.availableJobs]
        : [];
      const mSelectedJobs: Array<DIMJob> = this.selectedJobs
        ? [...this.selectedJobs]
        : [];
      (this.availableJobs = _.unionBy(mAvailableJobs, this.tempJobs)),
        (this.selectedJobs = _.pull(mSelectedJobs, _.head(this.tempJobs)));
      this.tempJobs = [];
    }
  }

  assignAll() {
    const mAvailableJobs = this.availableJobs ? [...this.availableJobs] : [];
    const mSelectedJobs = this.selectedJobs ? [...this.selectedJobs] : [];
    this.availableJobs = [];
    this.selectedJobs = _.uniqBy(
      _.unionBy(mAvailableJobs, mSelectedJobs, 'id'),
      'id'
    );
    this.selectedJobsEventEmitter.emit(this.selectedJobs);
  }

  removeAll() {
    const mAvailableJobs = this.availableJobs ? [...this.availableJobs] : [];
    const mSelectedJobs = this.selectedJobs ? [...this.selectedJobs] : [];
    this.selectedJobs = [];
    this.availableJobs = _.uniqBy(
      _.unionBy(mAvailableJobs, mSelectedJobs, 'id'),
      'id'
    );
  }
}
