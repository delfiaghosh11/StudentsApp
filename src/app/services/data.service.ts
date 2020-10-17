import { Students } from './../students';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://delfia11.000webhostapp.com/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  getAllStudents() {
    return this.http.get(this.url + 'index.php');
  }

  getColleges() {
    return this.http.get(this.url + 'colleges.php');
  }

  getCollegeById(id: number) {
    return this.http.get(this.url + 'getCollegeById.php?id=' + id);
  }

  getCollegeByDid(id: number) {
    return this.http.get(this.url + 'getCollegeByDid.php?id=' + id);
  }

  getDepartments(cid: number) {
    return this.http.get(this.url + 'departments.php?cid=' + cid);
  }

  getDepartmentById(id: number) {
    return this.http.get(this.url + 'getDepartmentById.php?id=' + id);
  }

  getStudentsByDepartment(did: number) {
    return this.http.get(this.url + 'getStudentByDepartment.php?did=' + did);
  }

  getStudentById(sid: number) {
    return this.http.get(this.url + 'getStudentById.php?sid=' + sid);
  }

  create(resource) {
    return this.http.post(
      this.url + 'insertStudent.php',
      JSON.stringify(resource)
    );
  }

  update(resource) {
    return this.http.post(
      this.url + 'updateStudent.php',
      JSON.stringify(resource)
    );
  }

  delete(sid: number) {
    return this.http.get(this.url + 'deleteStudent.php?sid=' + sid);
  }
}
