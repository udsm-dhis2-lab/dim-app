import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { uuid } from '@icodebible/utils/uuid';
import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { CreateSystem } from 'src/app/pages/system/state';
import { DIMSystem } from 'src/app/pages/home/models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getSystemCreatedStatus,
  getSelectedSystem,
} from 'src/app/pages/system/state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { SystemState } from '../../../state/integration.state';

@Component({
  selector: 'app-edit-system',
  templateUrl: './edit-system.component.html',
  styleUrls: ['./edit-system.component.scss'],
})
export class EditSystemComponent implements OnInit, OnDestroy {
  systemFormEntries: DataEntryField = _.clone(_.create());
  updateSystemForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    isExecuted: new FormControl(false),
    dataSet: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    ou: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    description: new FormControl(''),
    defaultCOC: new FormControl(''),
    isAllowed: new FormControl(false),
    importURL: new FormControl(''),
    isUsingHIM: new FormControl(''),
    dataFromURL: new FormControl(''),
    isUsingLiveDhis2: new FormControl(false),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  subscriptions: Array<Subscription> = [];
  systemFormSUB$: Subscription;
  systemUpdatedSUB$: Subscription;
  updatedSystemSUB$: Subscription;
  selectedSystemSUB$: Subscription;

  constructor(
    private systemState: Store<SystemState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.systemFormSUB$ = this.updateSystemForm.valueChanges.subscribe(
      (systemIntegration: DIMSystem) => {
        this.systemFormEntries = onUpdateFormProps(
          this.systemFormEntries,
          systemIntegration
        );
      }
    );
    this.selectedSystemSUB$ = this.systemState
      .pipe(select(getSelectedSystem))
      .subscribe((system: DIMSystem) => {
        this.updateSystemForm.patchValue(system);
      });
    this.subscriptions.push(this.systemFormSUB$);
    this.subscriptions.push(this.selectedSystemSUB$);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  onSubmitForm(): void {
    const id = uuid('', 11);
    const system = _.merge(_.clone(this.systemFormEntries), {
      id,
    });
    this.systemState.dispatch(
      CreateSystem(_.clone({ systemIntegration: system }))
    );
    this.systemUpdatedSUB$ = this.systemState
      .pipe(select(getSystemCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.updateSystemForm.reset();
          OpenSnackBar(
            this.snackBar,
            `System "${system?.name}" with id <${system?.id}> is successfully updated`,
            '',
            'success-snackbar'
          );
        }
      });
    this.subscriptions.push(this.systemUpdatedSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
