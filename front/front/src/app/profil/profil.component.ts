import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

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
  otherForm: FormGroup;
  id = '';
  all_pan = new Array;
  friends = [];
  postData = {
    name: 'here',
    password: 'none',
  };
  otherurl = "http://localhost:4000/api/1/";

  urlget = "http://localhost:4000/api/1/name=";
  url = "http://localhost:4000/api/1/id=";

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.name = this.route.snapshot.paramMap.get("name");
    this.http.get(this.urlget + this.name).toPromise().then(data => {
      this.password = data[0].password;
      this.age = data[0].age;
      this.race = data[0].race;
      this.familly = data[0].familly;
      this.id = data[0]._id;
      this.friends = new Array (data[0].friends);
    });
    this.http.get("http://localhost:4000/api/1/list").toPromise().then(data => {
      this.all_pan = new Array (data);
      for (let i = 0; i <= this.all_pan.length; i++) {
        if (this.all_pan[0][i].name === this.name)
          this.all_pan[0].splice(i, 1);
      }
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
    this.otherForm = this.fb.group({
      who: [],
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

  number_random = () => {
    return (Math.floor(Math.random() * 100));
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

  send_request_toapi = () => {
    this.http.post(this.otherurl, this.postData).toPromise().then(data => {
      console.log(data);
    });
  }

  add_other = () => {
    this.postData.name = this.otherForm.value.who;
    if (this.otherForm.value.password == this.otherForm.value.confirm_password) {
      this.send_request_toapi();
      window.location.reload();
    }
    this.update_value("add_friend", this.otherForm.value.who);
  }
}
