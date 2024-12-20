import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isHidden:boolean=true;
  email:string="";
  pwd:string="";
  msg:string="";
  remail:string="";
  rpwd:string="";
  user:any[]=[];
  constructor(private router:Router,private route: ActivatedRoute,
    private http:HttpClient){
    
  }

  ngOnInit(): void {

       //this.fetchUser(this.scheduled_by);
      }
    

    fetchUser(email:string){

      console.log(email);
      this.http.get('http://localhost:3000/getUser/'+this.email)
      .subscribe((response:any)=>
        {
          const user=response[0];
          this.remail=user.email;
          this.rpwd=user.pswrd;  //fix needed
          if(this.email===this.remail && this.pwd===this.rpwd ){
            this.isHidden=true;      
            this.router.navigate(['/welcome',this.email]);
            }
            else{
                this.msg="Email/Password incorrect";
            }
        },
      (error)=>{console.error('Error in fetching the user',error);});
    }
 
login(){
  console.log("in login()");
  if(this.email!=null && this.pwd!=null){
    this.fetchUser(this.email)
     
    }else{
      this.msg="Please Enter the credentials";
    }  
  
    }
}
