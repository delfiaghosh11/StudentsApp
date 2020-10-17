import { Colleges } from './../colleges';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css'],
})
export class CollegesComponent implements OnInit {
  colleges: Colleges[];
  cid: number;
  visible: boolean;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.visible = false;
  }

  ngOnInit(): void {
    this.getColleges();
  }

  getColleges() {
    this.service.getColleges().subscribe((data) => {
      this.colleges = data as Colleges[];
    });
  }

  form = new FormGroup({
    college: new FormControl('', [Validators.required]),
  });

  get college() {
    return this.form.get('college');
  }

  setCollegeId() {
    this.cid = this.college.value.id;
    // console.log(this.cid);
    this.visible = true;
  }

  submit(f) {
    console.log(f);
    this.setCollegeId();
  }
}
