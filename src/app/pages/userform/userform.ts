import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userform',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  templateUrl: './userform.html',
  styleUrl: './userform.css',
})
export class UserForm {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // lastName:['',Validators.required],
      // email:['',[Validators.required,Validators.email]],
      // phoneNumber:['',[Validators.required,Validators.pattern(/^(\+98|0)?9\d{9}$/)]]
    });
  }

  // onSubmit() {
  //   if (this.myForm.valid) {
  //     this.authService.login(this.myForm.value).subscribe({
  //       next: (res) => {
  //         if(res.hasError){
  //           this.toastr.error(res.messages?.[0] || 'نام کاربری یا رمز عبور اشتباه است ❌');
  //         return;
  //         }

  //         sessionStorage.setItem('token', res.token);
  //         this.toastr.success('login succssed ✅');
  //         const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/home';
  //         this.router.navigateByUrl(redirect);
  //         console.log('کاربر با موفقیت وارد شد', res);
  //       },
  //       error: (err) => {
  //         console.log('خطا در ورود کاربر', err);
  //         this.toastr.error('username or password requered ❌');
  //       },
  //     });
  //   } else {
  //     console.log('فرم نا معتبر است');
  //     this.toastr.warning('form is invalide ⚠️');
  //   }
  // }

  onSubmit() {
    if (!this.myForm.valid) {
      this.toastr.warning('form is invalid ⚠️');
      return;
    }
    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
        if (res.hasError) {
          this.toastr.error('username or password invalid ⚠️');
          console.log(res);
          return;
        }
        const token = res.result?.token;
        if (!token) {
          this.toastr.error('token undefined ❌');
          return;
        }
        sessionStorage.setItem('token', token);
        this.toastr.success('login successed ✅');
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/home';
        this.router.navigateByUrl(redirect);
        console.log('user entered successfully', res);
      },
      error: () => this.toastr.error('server error'),
    });
  }
}
