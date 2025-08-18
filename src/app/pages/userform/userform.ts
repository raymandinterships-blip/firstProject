import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-userform',
  imports: [ReactiveFormsModule,NgIf],
  standalone:true,
  templateUrl: './userform.html',
  styleUrl: './userform.css'
})
export class UserForm {
  myForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.myForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern(/^(\+98|0)?9\d{9}$/)]]
    })
  }
  onSubmit(){
    if(this.myForm.valid){
      console.log("داده های فرم",this.myForm.value)
    }else{
      console.log("فرم نا معتبر است")
    }
  }

}
