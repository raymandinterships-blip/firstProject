import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users-service';
import { HttpService } from '../services/http-service';
import { JalaliDatetimePickerComponent } from '../jalali-datetime-picker/jalali-datetime-picker.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf, JalaliDatetimePickerComponent],
  templateUrl: './user-form-component.html',
})
export class UserFormComponent implements OnInit {
  @Input() user: any;
  @Input() isEditMode: boolean = false;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  passwordValidator = () => {
    return (control: any) => {
      if (this.isEditMode) {
        if (!control.value || control.value.trim() === '') {
          return null;
        }
        if (control.value.length < 6) {
          return { minlength: true };
        }
      } else {
        if (!control.value || control.value.trim() === '') {
          return { required: true };
        }
        if (control.value.length < 6) {
          return { minlength: true };
        }
      }
      return null;
    };
  };

  userForm!: FormGroup;
  roleOptions: any[] = [];
  dateFormats = 'YYYY/MM/DD';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private httpService: HttpService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  loadRoles(): void {
    this.httpService.get<any>('users/get-roles').subscribe({
      next: (response) => {
        this.roleOptions = response.result.data.map((role: any) => ({
          label: role.description || role.name,
          value: role.name,
        }));
      },
      error: (err: HttpErrorResponse) => {
        console.error('خطا در بارگذاری نقش‌ها', err);
      },
    });
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      enable: true,
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
        ],
      ],
      password: ['', this.passwordValidator()],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^(\+98|0)?9\d{9}$/)]],
      national_code: ['', Validators.required],
      birth_date: ['', Validators.required],
      date_employed: ['', Validators.required],
      gender: ['', Validators.required],
      internal_number: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // ← اضافه شد
    });

    if (this.isEditMode && this.user) {
      this.userForm.patchValue({
        ...this.user,
        birth_date: this.user.birth_date?.replace(/-/g, '/') || '',
        date_employed: this.user.date_employed?.replace(/-/g, '/') || '',
      });
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const formattedValue = {
      ...formValue,
      birth_date: formValue.birth_date?.replace(/\//g, '-') || '',
      date_employed: formValue.date_employed?.replace(/\//g, '-') || '',
      internal_number_type: '1',

      webrtc_username: '',
      webrtc_password: '',
    };
    const request$ = this.isEditMode
      ? this.usersService.updateUser({ ...formattedValue, id: this.user.id })
      : this.usersService.addUser(formattedValue);

    request$.subscribe({
      next: (res: any) => {
        if (res.hasError) {
          if (Array.isArray(res.messages)) {
            res.messages.forEach((msg: string) => {
              this.toaster.error(msg, 'خطا');
            });
          } else {
            this.toaster.error(res.messages || 'خطای نامشخص', 'خطا');
          }
          return;
        }
        this.toaster.success(
          this.isEditMode ? 'user edited seccssefully' : 'user created successfully'
        );
        this.saved.emit();
      },
      error: (err: HttpErrorResponse) => {
        const fallbackMsg = this.isEditMode ? 'خطا در ویرایش کاربر' : 'خطا در ایجاد کاربر';
        if (err.error?.messages) {
          const msgs = Array.isArray(err.error.messages)
            ? err.error.messages
            : [err.error.messages];
          msgs.forEach((msg: string) => this.toaster.error(msg, 'خطا'));
        } else if (err.error?.message) {
          this.toaster.error(err.error.message, 'خطا');
        } else {
          this.toaster.error(fallbackMsg, 'خطا');
        }
      },
    });
  }
  get birthDateControl(): FormControl {
    return this.userForm.get('birth_date') as FormControl;
  }
  get employedDateControl(): FormControl {
    return this.userForm.get('date_employed') as FormControl;
  }
}
