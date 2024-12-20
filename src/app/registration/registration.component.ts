import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-registration',
  standalone: false,
  
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  isHidden:boolean=true;
  name:string="";
  email:string="";
  address:string="";
  pwd:string="";
  repeatPwd:string="";
  msg:string="";

  constructor(private router:Router, private http:HttpClient){

  }
  save(){
    if(this.name!=null && this.email!=null && this.address!=null && this.pwd!=null && this.repeatPwd!=null && this.pwd==this.repeatPwd){
      const user={
        name:this.name,
        email:this.email,
        address:this.address,
        pwd:this.pwd
      };
      this.http.post('http://localhost:3000/addUser',user)
      .subscribe((response:any)=>
        {this.msg=response.message},
        (error)=>{
          console.error('Error in adding User');
        }
      )     
      this.router.navigate(['login'])
    }
      
  }
}
