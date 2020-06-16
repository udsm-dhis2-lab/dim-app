import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
})
export class SystemListComponent implements OnInit {
  dataSource = [];
  displayedColumns = ['id'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {}

  openDataEntryForm(): void {
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  applyFilter(e: any) {}

  onEdit() {
    //
  }

  onDelete() {
    //
  }

  onViewMore() {
    //
  }
}
