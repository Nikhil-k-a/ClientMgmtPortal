import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: false,
  
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  msg:any;
  message:string="";
  isHidden:boolean=true;
  scheduledBy:any;
  topic:string="";
  count:any;
  time:Date=new Date();
  email:string="";
  meeting:[]=[];

 constructor(private router:Router,private route: ActivatedRoute,
     private http:HttpClient){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      
      // const scheduled_by=params.get('scheduled_by')
       const topic=params.get('topic')
      // const count=params.get('no_of_ppl')
      // const time=params.get('startTime')
      const email=params.get('email')
      console.log("email" + email + " topic"+topic )
      if(topic!=null && email!=null){
      //  this.scheduledBy=parseInt(scheduled_by);
       this.topic=topic;
      //  this.count=parseInt(count);
      //  this.time=time;
       this.email=email;
       this.fetchUser(this.email)
       console.log("email" + email + " topic"+topic )
       //this.fetchUser(this.scheduledBy);
       //this.schedule(this.scheduled_by);this.userId=this.msg[0].substring
      }
    })}

    // fetchMeetings(email:string){

    //   console.log("in fetchMeetings"+email)
    //   this.fetchUser(this.email);
     
      
    //     //console.log("in fetchMeetings"+this.msg[0].user_id)
      
    // }

    fetchUser(email:string){
      console.log(email);
     
    this.http.get('http://localhost:3000/getUser/'+email).subscribe((response:any)=>
      {this.msg=response, this.scheduledBy=this.msg[0].user_id ,
        this.http.get('http://localhost:3000/getMeeting/'+this.scheduledBy).subscribe((response:any)=>
          {this.meeting=response, this.count= response[0].no_of_ppl, this.time=response[0].startTime},
        (error)=>{console.error('Error in adding the product',error);});
       },
    (error)=>{console.error('Error in fetching the meeting details',error);});
    }

    callscheduled(){
      this.router.navigate(['/scheduled',this.email]);
    }
  
   editMeeting(){
    const obj = {topic: this.topic , no_of_ppl: this.count , startTime: this.time , scheduled_by:this.scheduledBy, email:this.email};
    console.log("email" + obj.email + " topic"+obj.topic + "count"+obj.no_of_ppl + "time"+ obj.startTime + "id" + this.scheduledBy )
    this.http.put('http://localhost:3000/updateMeeting/',obj)
        .subscribe((response:any)=>{
           this.message="Successfully updated the meeting!!! Redirecting to Scheduled meetings page",
                        timer(3000).subscribe(() => {
                        this.msg=response.message;this.router.navigate(['/scheduled',this.email]);
                        // Do something after 5 seconds
                      });},
        (error)=>{console.error('Error in deleting the product',error);}
      ) 
   }
    
}
