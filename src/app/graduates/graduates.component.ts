import { Graduates } from './../graduates';
import { Departments } from './../departments';
import { DataService } from './../services/data.service';
import { Colleges } from './../colleges';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';
import { filter, find, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.css'],
})
export class GraduatesComponent implements OnInit {
  colleges: Colleges[];
  departments: Departments[];
  graduates: Graduates[];
  cid: number;
  did: number;
  visible: boolean;
  searching: boolean;
  isCollege: boolean;
  isDepartment: boolean;
  isEmpty: boolean;
  femaleImgUrl: string;
  maleImgUrl: string;
  graduateSearch: boolean;
  isFound: boolean;
  searchName: string;
  searchIsOn: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.visible = false;
    this.searching = true;
    this.isCollege = false;
    this.isDepartment = false;
    this.isEmpty = false;
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://ziakapoor.com/wp-content/uploads/2020/03/zia-kapoor-escorts-happy-customers-1.png';
    this.graduateSearch = false;
    this.isFound = true;
    this.searchName = '';
  }

  ngOnInit(): void {
    this.getColleges();
  }

  getColleges() {
    this.service.getColleges().subscribe((data) => {
      this.colleges = data as Colleges[];
      this.searching = false;
    });
  }

  getDepartments(id: number) {
    this.service.getDepartments(id).subscribe((data) => {
      this.departments = data as Departments[];
      this.isCollege = true;
    });
  }

  form = new FormGroup({
    college: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  get college() {
    return this.form.get('college');
  }

  get department() {
    return this.form.get('department');
  }

  setCollege(e) {
    if (e.target.value !== '') {
      this.cid = this.college.value.id;
      this.getDepartments(this.cid);
    } else {
      this.isCollege = false;
    }
  }

  setDepartment(e) {
    if (e.target.value !== '') {
      this.did = this.department.value.id;
      this.isDepartment = true;
    } else {
      this.isDepartment = false;
    }
  }

  submit(f) {
    this.graduateSearch = true;
    console.log(f);
    this.getGraduates();
  }

  getGraduates() {
    this.service
      .getGraduatesByDidAndCid(this.cid, this.did)
      .subscribe((data) => {
        this.graduates = data as Graduates[];
        if (this.graduates.length > 0) {
          this.isEmpty = false;
          this.visible = true;
        } else {
          this.isEmpty = true;
          this.visible = false;
        }
      });
    this.graduateSearch = false;
  }

  goBack() {
    this.location.back();
  }

  search() {
    this.searchIsOn = true;

    // this.studentsData = this.service.getStudents();

    let found;
    from(this.graduates)
      .pipe(find((item) => item.name === this.searchName))
      .subscribe((data) => {
        found = data;
      });

    if (this.searchName === '') {
      this.isFound = true;
      this.searchIsOn = false;
    } else if (this.searchName !== '' && found === undefined) {
      this.isFound = false;
    } else {
      from(this.graduates)
        .pipe(
          filter((item) => item.name === this.searchName),
          toArray()
        )
        .subscribe((data) => {
          this.graduates = data;
        });

      this.isFound = true;
    }
    this.searchName = '';
    // console.log(this.service.getStudents());
  }

  back() {
    // this.searching = true;
    // this.getGraduates();
    this.isFound = true;
    this.searchIsOn = false;
  }
}
