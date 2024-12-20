import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
@Component({
  selector: 'app-schedule',
  standalone: false,
  
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  isHidden:boolean=true;
  topic:string="";
  startTime:Date=new Date();
  count:string="";
  scheduledBy:string="";
  msg:any;
  userId:any;
  constructor(private router:Router,private route: ActivatedRoute,
    private http:HttpClient){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const email=params.get('email')
      if(email!=null){
       this.scheduledBy=email;
       //this.fetchUser(this.scheduledBy);
       //this.schedule(this.scheduled_by);this.userId=this.msg[0].substring
      }
    })}
  
  
      callscheduled(email:string){
        this.router.navigate(['/scheduled',email]);
      }
  
      fetchUser(email:string){
        console.log(email);
        
      }

    callwelcome(email:string){
      this.router.navigate(['/welcome',email])
        }
        
  schedule(email:string){
    
    console.log("in schedule()"+email);
    this.http.get('http://localhost:3000/getUser/'+email).subscribe((response:any)=>
      {this.msg=response,this.userId=this.msg[0].user_id,console.log("response" +this.userId),
        console.log("in schedule() id: "+this.userId);
        // console.log("in schedule() id"+userId);
         this.scheduledBy=email;
         console.log(this.topic);
         console.log(this.count);
         console.log(this.startTime);
         console.log(this.userId);
         if(this.topic!=null && this.count!=null && this.startTime!=null && this.scheduledBy!=null){
           const meeting={
             topic:this.topic,
             no_of_ppl:this.count,
             startTime:this.startTime,
             scheduled_by:this.userId
           };
           console.log("in if()");
           console.log(meeting.no_of_ppl);
           console.log(meeting.scheduled_by);
           this.http.post('http://localhost:3000/addMeeting',meeting)
           .subscribe((response:any)=>{
            this.msg="Successfully scheduled the meeting!!! Redirecting to Scheduled meetings page",
              timer(3000).subscribe(() => {
              this.msg=response.message;this.router.navigate(['/scheduled',this.scheduledBy]);
              // Do something after 5 seconds
            });
             },
             (error)=>{
               console.error('Error in scheduling meeting');
             }
           )
           console.log("successfully registered")
           
         }
      },
    (error)=>{console.error('Error in fetching the user',error);});
    
      
  }
}
