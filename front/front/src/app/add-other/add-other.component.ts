import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-other',
  templateUrl: './add-other.component.html',
  styleUrls: ['./add-other.component.css']
})
export class AddOtherComponent implements OnInit {
  otherForm: FormGroup;
  otherurl = "http://localhost:4000/api/1/";
  url = "http://localhost:4000/api/1/id=";

  @Input() id;
  @Input() name;
  postData = {
    name: 'here',
    password: 'none',
  };

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
      this.otherForm = this.fb.group({
        who: [],
      });  
  }

  ngOnInit(): void {}

  send_request_toapi = () => {
    this.http.post(this.otherurl, this.postData).toPromise().then(data => {
      console.log(data);
    });
  }

  update_value = (vari, value) => {
    this.http.put(this.url + this.id + "/" + vari + '=' + value, this.name).toPromise().then(data => {
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
