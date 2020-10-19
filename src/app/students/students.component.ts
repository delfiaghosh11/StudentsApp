import { Graduates } from './../graduates';
import { Departments } from './../departments';
import { Colleges } from './../colleges';
import { Students } from './../students';
import { filter, find, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Students[];
  femaleImgUrl: string;
  maleImgUrl: string;
  sex: string;
  searchIsOn: boolean;
  editMode = new Array();
  isCompleted: boolean;
  isFound: boolean;
  searchName: string;
  did: number;
  lastSid: number;
  allStudents: Students[];
  searching: boolean;
  college: Departments[];
  cid: number;
  isEmpty: boolean;
  graduates: Graduates[];
  lastGid: number;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://ziakapoor.com/wp-content/uploads/2020/03/zia-kapoor-escorts-happy-customers-1.png';
    this.searchIsOn = false;
    this.isFound = true;
    this.searchName = '';
    this.searching = true;
    this.isEmpty = false;
  }

  ngOnInit(): void {
    // this.getData();
    this.getStudents();
    this.getAllStudents();
    this.getAllGraduates();
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe((data) => {
      this.allStudents = data as Students[];
    });
  }

  getAllGraduates() {
    this.service.getAllGraduates().subscribe((data) => {
      this.graduates = data as Graduates[];
    });
  }

  getStudents() {
    this.did = +this.route.snapshot.paramMap.get('did');
    this.getCollegeId(this.did);

    this.service.getStudentsByDepartment(this.did).subscribe((data) => {
      this.students = data as Students[];
      this.students.sort((a, b) => {
        return a.roll - b.roll;
      });
      if (this.students.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      // console.log(this.students);
      this.searching = false;
    });
  }

  getCollegeId(id: number) {
    this.service.getCollegeByDid(id).subscribe((data) => {
      this.college = data as Departments[];
      this.cid = this.college[0].cid;
      // console.log(this.cid);
    });
  }

  form = new FormGroup({
    studentRoll: new FormControl('', [Validators.required]),
    studentName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    studentCity: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    studentContact: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    studentDegree: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
    ]),
    gender: new FormControl('', Validators.required),
  });

  get studentRoll() {
    return this.form.get('studentRoll');
  }

  get studentName() {
    return this.form.get('studentName');
  }

  get studentCity() {
    return this.form.get('studentCity');
  }

  get studentContact() {
    return this.form.get('studentContact');
  }

  get studentDegree() {
    return this.form.get('studentDegree');
  }

  get gender() {
    return this.form.get('gender');
  }

  // Start Add Student

  createStudent() {
    if (this.allStudents.length > 0) {
      this.lastSid = this.allStudents[this.allStudents.length - 1].sid;
    } else {
      this.lastSid = 99;
    }

    let student = {
      sid: ++this.lastSid,
      roll: this.studentRoll.value,
      name: this.studentName.value,
      city: this.studentCity.value,
      contact: this.studentContact.value,
      gender: this.gender.value,
      degree: this.studentDegree.value,
      did: this.did,
      cid: this.cid,
    };

    this.service.create(student).subscribe(() => {
      this.getStudents();
    });

    this.form.reset();
    // console.log(this.service.getStudents());
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender.reset();
      this.gender.setValue('female');
    } else {
      this.gender.reset();
      this.gender.setValue('male');
    }
  }

  submit(form) {
    console.log('Successfully Submitted: ', form);
    this.createStudent();
  }

  // End Add Student

  delete(e, item) {
    this.service.delete(item.sid).subscribe(() => {
      this.getStudents();
    });
    // this.service.deleteStudent(e, item);
    // console.log(this.service.getStudents());
  }

  // Start Update Student

  setSex(e) {
    if (e.target.value === 'female') {
      this.sex = 'female';
    } else {
      this.sex = 'male';
    }
  }

  editRow(student, index) {
    this.editMode[index] = true;
    this.sex = student.gender;
    this.isCompleted = student.isCompleted;
  }

  saveRow(student, index) {
    if (
      student.roll === '' ||
      student.name === '' ||
      student.city === '' ||
      student.contact === '' ||
      student.gender === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;

      this.service.update(student).subscribe(() => {
        this.getStudents();
      });

      // console.log(this.service.getStudents());
    }
  }

  // End Update Student

  search() {
    this.searchIsOn = true;

    // this.studentsData = this.service.getStudents();

    let found;
    from(this.students)
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
      from(this.students)
        .pipe(
          filter((item) => item.name === this.searchName),
          toArray()
        )
        .subscribe((data) => {
          this.students = data;
        });

      this.isFound = true;
    }
    this.searchName = '';
    // console.log(this.service.getStudents());
  }

  back() {
    this.searching = true;
    this.getStudents();
    this.isFound = true;
    this.searchIsOn = false;
  }

  goBack() {
    this.location.back();
  }

  graduate(index, item) {
    if (this.graduates.length > 0) {
      this.lastGid = this.graduates[this.graduates.length - 1].gid;
    } else {
      this.lastGid = 99;
    }

    let currentYear = new Date().getFullYear();

    let graduate = {
      gid: ++this.lastGid,
      roll: item.roll,
      name: item.name,
      city: item.city,
      contact: item.contact,
      gender: item.gender,
      degree: item.degree,
      year: currentYear,
      did: this.did,
      cid: this.cid,
    };

    this.service.createGraduate(graduate).subscribe(() => {
      this.getAllGraduates();
    });

    this.service.delete(item.sid).subscribe(() => {
      this.getStudents();
    });
  }
}
