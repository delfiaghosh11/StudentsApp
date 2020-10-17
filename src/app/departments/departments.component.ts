import { Departments } from './../departments';
import { Students } from './../students';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  departments: Departments[];
  cid: number;
  searching: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.searching = true;
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.cid = +this.route.snapshot.paramMap.get('cid');
    this.service.getDepartments(this.cid).subscribe((data) => {
      this.departments = data as Departments[];
      this.searching = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
