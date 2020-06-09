import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Form } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  name = 'Loic';
  password = '';
  age = '';
  race = '';
  familly = '';
  loginFrom: FormGroup;
  id = '';

  urlget = "http://localhost:4000/api/1/name=";
  url = "http://localhost:4000/api/1/id=";
  // :var=:value

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get(this.urlget + this.name).toPromise().then(data => {
      this.password = data[0].password;
      this.age = data[0].age;
      this.race = data[0].race;
      this.familly = data[0].familly;
      this.id = data[0]._id;
      console.log(data[0]);
    });
  }

  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      name: [],
      pass: [],
      age: [],
      race: [],
      familly: [],
    });
  }

  update_value = (vari, value) => {
      this.http.put(this.url + this.id + "/" + vari + '=' + value, this.name).toPromise().then(data => {
    });
  }

  changedata() {
    if (this.loginFrom.value.age != this.age && this.loginFrom.value.age != undefined) {
      this.update_value("age", this.loginFrom.value.age);
    }
    if (this.loginFrom.value.race != this.race && this.loginFrom.value.race != undefined) {
      this.update_value("race", this.loginFrom.value.race);
    }
    if (this.loginFrom.value.familly != this.familly && this.loginFrom.value.familly != undefined) {
      this.update_value("familly", this.loginFrom.value.familly);
    }
    if (this.loginFrom.value.pass != this.password && this.loginFrom.value.pass != undefined) {
      this.update_value("password", this.loginFrom.value.password);
    }
  }
}
