import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable, Subscription} from 'rxjs';
import {NgForm, NgModelGroup} from '@angular/forms';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  public passwordMismatch = false;
  public emailTaken = false;

  constructor(public authService: AuthService) {}

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
  }

  onSignup(form: NgForm, event) {

    // Object.keys(form.controls).forEach((key: string) => {
    //   const abstractControl = form.form.get(key);
    //   console.log(abstractControl);
    // });
    this.passwordMismatch = false;
    this.emailTaken = false;
    if (form.invalid) {
      event.preventDefault();
      return;
    }
    if (form.value.repeatPassword !== form.value.password) {
      this.passwordMismatch = true;
      return;
    }

    const userCredentials = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      password: form.value.password
    };

    this.authService.createUser(userCredentials).catch(e => {
      this.emailTaken = true;
    });
  }

}
