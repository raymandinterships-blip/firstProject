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
    });
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.toastr.warning(' فرم نا معتبر است  ⚠️');
      return;
    }
    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
        if (res.hasError) {
          this.toastr.error('نام کاربری یا رمز عبور نا معتبر است ⚠️');
          console.log(res);
          return;
        }
        const token = res.result?.token;
        if (!token) {
          this.toastr.error('ا دسترسی نامعتبر ❌');
          return;
        }
        sessionStorage.setItem('token', token);
        this.toastr.success('کاربر با موفیفت وارد شد ✅');
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/home';
        this.router.navigateByUrl(redirect);
        console.log('user entered successfully', res);
      },
      error: () => this.toastr.error('خطای سرور '),
    });
  }
}
