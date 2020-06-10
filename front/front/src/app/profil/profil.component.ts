import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  name = '';
  password = '';
  age = '';
  race = '';
  familly = '';
  loginFrom: FormGroup;
  id = '';
  number = Math.floor(Math.random() * 100);
  all_pan = new Array;
  friends = new Array;

  urlget = "http://localhost:4000/api/1/name=";
  url = "http://localhost:4000/api/1/id=";
  // :var=:value

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get("name");
    this.http.get(this.urlget + this.name).toPromise().then(data => {
      console.log(this.urlget + this.name);
      this.password = data[0].password;
      this.age = data[0].age;
      this.race = data[0].race;
      this.familly = data[0].familly;
      this.id = data[0]._id;
      this.friends = new Array (data[0].friends);
      console.log(data[0]);
    });
    this.http.get("http://localhost:4000/api/1/list").toPromise().then(data => {
      var s = new Array(data);
      this.all_pan = s;
      console.log(this.all_pan);
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

  add = (item) => {
    console.log(this.friends);
    if (this.friends[0].includes(item.name)) {
      alert(item.name + " est déjà dans vos amis");
    } else {
      alert(item.name + " a était ajouté à vos amis");
      this.update_value("add_friend", item.name);
    }
    window.location.reload();
  }

  delete = (item) => {
    console.log(this.friends);
    if (this.friends[0].includes(item.name)) {
      alert(item.name + " a était supprimé de vos amis");
      this.update_value("rem_friend", item.name);
    } else {
      alert(item.name + " est pas dans vos amis");
    }
    window.location.reload();
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
