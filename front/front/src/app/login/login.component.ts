import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginFrom: FormGroup;

  url = "http://localhost:4000/api/1/name=";

  constructor(private fb: FormBuilder, private http: HttpClient
    , private router: Router) {

  }
  
  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      username: [],
      password: [],
    });
  }

  login() {
    this.http.get(this.url + this.loginFrom.value.username).toPromise().then(data => {
      if (data[0].password == this.loginFrom.value.password) {
        this.router.navigate(['/profil/' + this.loginFrom.value.username]);
      } else {
        alert('Error mot de passe / compte');
      }
    });
  }
}
