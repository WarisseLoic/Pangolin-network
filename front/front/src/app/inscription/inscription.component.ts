import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  loginFrom: FormGroup;
  postData = {
    name: 'here',
    password: 'this',
  };

  url = "http://localhost:4000/api/1/";

  constructor(private fb: FormBuilder, private http: HttpClient) {

  }

  send_request_toapi = () => {
    this.http.post(this.url, this.postData).toPromise().then(data => {
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      username: [],
      password: [],
      confirm_password: [],
    });

  }

  inscription() {
    this.postData.name = this.loginFrom.value.username;
    this.postData.password = this.loginFrom.value.password;
    if (this.loginFrom.value.password == this.loginFrom.value.confirm_password)
      this.send_request_toapi();
  }
}
