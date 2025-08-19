import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-userform',
  imports: [ReactiveFormsModule,NgIf],
  standalone:true,
  templateUrl: './userform.html',
  styleUrl: './userform.css'
})
export class UserForm {
  myForm:FormGroup;
  constructor(private fb:FormBuilder  ,private authService:AuthService){
    this.myForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
      // lastName:['',Validators.required],
      // email:['',[Validators.required,Validators.email]],
      // phoneNumber:['',[Validators.required,Validators.pattern(/^(\+98|0)?9\d{9}$/)]]
    })
  }
  onSubmit(){
    if(this.myForm.valid){
      this.authService.create(this.myForm.value).subscribe({
        next:(res)=>{
          console.log("کاربر با موفقیت ساخته شد",res)
        },error:(err)=>{
          console.log("خطادرایجادکاربر",err)
        }
      })
    }else{
      console.log("فرم نا معتبر است")
    }
  }

}
