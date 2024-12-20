import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  isHidden:boolean=true;
  email:string="";
  user:string="";
  msg:any;
  userId:number=0;

  constructor(private router:Router,private route: ActivatedRoute,
    private http:HttpClient){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const email=params.get('email')
      if(email!=null){
       this.email=email;
      // this.startschedule(this.email);
      this.fetchUser(this.email);
      }
    })}

    callscheduled(email:string){
      this.router.navigate(['/scheduled',this.email]);
    }

    fetchUser(email:string){
      console.log(email);
      this.http.get('http://localhost:3000/getUser/'+this.email).subscribe((response:any)=>
        {this.msg=response, this.user=this.msg[0].name,this.userId=this.msg[0].user_id},
      (error)=>{console.error('Error in adding the product',error);});
    }
    


  startschedule(email:string){
    this.router.navigate(['/schedule',this.email]);
  }

  // ngOnInit(): void {
  //   this.fetchproducts();
  //   //this.message=updatedmsg;
  // }


}
