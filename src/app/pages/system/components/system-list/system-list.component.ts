import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
})
export class SystemListComponent implements OnInit {
  dataSource = [];
  displayedColumns = ['id'];

  constructor(private router: Router, private route: ActivatedRoute) {}

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
