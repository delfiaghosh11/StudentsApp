import { Departments } from './../departments';
import { Colleges } from './../colleges';
import { Graduates } from './../graduates';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graduate-details',
  templateUrl: './graduate-details.component.html',
  styleUrls: ['./graduate-details.component.css'],
})
export class GraduateDetailsComponent implements OnInit {
  graduates: Graduates[];
  femaleImgUrl: string;
  maleImgUrl: string;
  gid: number;
  colleges: Colleges[];
  departments: Departments[];
  college: Object;
  department: Object;
  searching: boolean;
  editMode: boolean;
  sex: string;

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
    this.editMode = false;
  }

  ngOnInit(): void {
    this.getGraduate();
  }

  getGraduate() {
    this.gid = +this.route.snapshot.paramMap.get('gid');

    this.service.getGraduateById(this.gid).subscribe((data) => {
      this.graduates = data as Graduates[];
      this.getCollege(this.graduates[0].cid);
      this.getDepartment(this.graduates[0].did);
    });
  }

  getCollege(id: number) {
    this.service.getCollegeById(id).subscribe((data) => {
      this.colleges = data as Colleges[];
      this.college = this.colleges[0];
      // console.log(this.college);
      this.searching = false;
    });
  }

  getDepartment(id: number) {
    this.service.getDepartmentById(id).subscribe((data) => {
      this.departments = data as Departments[];
      this.department = this.departments[0];
      // console.log(this.department);
      this.searching = false;
    });
  }

  setSex(e) {
    if (e.target.value === 'female') {
      this.sex = 'female';
    } else {
      this.sex = 'male';
    }
  }

  edit(graduate, index) {
    this.editMode = true;
    this.sex = graduate.gender;
  }

  save(graduate, index) {
    if (
      graduate.roll === '' ||
      graduate.name === '' ||
      graduate.city === '' ||
      graduate.contact === '' ||
      graduate.gender === ''
    ) {
      this.editMode = true;
    } else {
      this.editMode = false;

      this.service.updateGraduate(graduate).subscribe(() => {
        this.getGraduate();
      });

      // console.log(this.service.getStudents());
    }
  }

  goBack() {
    this.location.back();
  }
}
