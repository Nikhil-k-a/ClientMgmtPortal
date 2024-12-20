import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-scheduled',
  standalone: false,
  
  templateUrl: './scheduled.component.html',
  styleUrl: './scheduled.component.css'
})
export class ScheduledComponent {
  isHidden:boolean=true;
id:number=0;
  email:string="";
  msg:any;
  rtopic:string="";
  rCount:string="";
  rTime:Date=new Date();
  meetings:any[]=[];
  constructor(private router:Router,private route: ActivatedRoute,
    private http:HttpClient){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const email=params.get('email')
      if(email!=null){
        console.log(email);
       this.email=email;
      this.fetchMeetings(this.email);
     
      }
    })}

    callwelcome(email:string){
  this.router.navigate(['/welcome',email])
    }

    callschedule(email:string){
      this.router.navigate(['/schedule',email])
    }

    fetchMeetings(email:string){

      console.log("in fetchMeetings"+email)
      this.fetchUser(this.email);
      console.log("in fetchMeetings"+ this.id)
     
      
        //console.log("in fetchMeetings"+this.msg[0].user_id)
      
    }

    fetchUser(email:string){
      console.log(email);
     
    this.http.get('http://localhost:3000/getUser/'+email).subscribe((response:any)=>
      {this.msg=response,this.id=this.msg[0].user_id,console.log("response" +this.id),
        this.http.get('http://localhost:3000/getMeeting/'+this.id).subscribe((response:any)=>
          {this.meetings=response},
        (error)=>{console.error('Error in adding the product',error);});
      },
    (error)=>{console.error('Error in fetching the user',error);});
    }


    deleteMeeting(topicName:string,scheduled_by_id:number){
      if(confirm('Are you sure want to delete this meeting?')){
        const obj = {topic: topicName, scheduled_by: scheduled_by_id};
        // this.http.get('test', { params: obj}).subscribe();
        this.http.delete('http://localhost:3000/deleteMeeting/',{ params: obj})
        .subscribe((response:any)=>
          {this.msg=response.message;this.fetchMeetings(topicName);},
        (error)=>{console.error('Error in deleting the product',error);}
      )  
      }
    }

    editMeeting(meeting:any){
        const obj = {topics: meeting.topic , counts: meeting.no_of_ppl , times: meeting.startTime , scheduledBys:meeting.scheduled_by,email:this.email};
        // this.http.get('test', { params: obj}).subscribe();
        this.router.navigate(['/edit',meeting.topic ,this.email]);
         
      
    }

}
