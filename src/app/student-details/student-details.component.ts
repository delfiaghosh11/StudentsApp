import { Departments } from './../departments';
import { Colleges } from './../colleges';
import { Students } from './../students';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  students: Students[];
  femaleImgUrl: string;
  maleImgUrl: string;
  sid: number;
  colleges: Colleges[];
  departments: Departments[];
  college: Object;
  department: Object;
  searching: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://ziakapoor.com/wp-content/uploads/2020/03/zia-kapoor-escorts-happy-customers-1.png';
    this.searching = true;
  }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.sid = +this.route.snapshot.paramMap.get('sid');
    this.service.getStudentById(this.sid).subscribe((data) => {
      this.students = data as Students[];
      this.getCollege(this.students[0].cid);
      this.getDepartment(this.students[0].did);
      // console.log(this.students);
      this.searching = false;
    });
  }

  getCollege(id: number) {
    this.service.getCollegeById(id).subscribe((data) => {
      this.colleges = data as Colleges[];
      this.college = this.colleges[0];
      // console.log(this.college);
    });
  }

  getDepartment(id: number) {
    this.service.getDepartmentById(id).subscribe((data) => {
      this.departments = data as Departments[];
      this.department = this.departments[0];
      // console.log(this.department);
    });
  }

  goBack() {
    this.location.back();
  }
}
