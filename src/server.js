// import the modules
const express=require('express') // a framework used to perform the BE server operations from the node js 
const mysql=require('mysql')//node js module uses this to connect with the MYSQL db
const bodyParser=require('body-parser')//middleware used to parse the body data recieved from the client
const cors=require('cors')// middle ware to enable the cors which interacts with the differnt origins 


//define the express application 
const app=express();  //instance of the express app-->main server object
app.use(cors());//enable cors 
app.use(bodyParser.json()) //enable bodyparser to read the json data 

const port=3000;


//establish the connection with the dB : 
//stored the information of the db connection in the db object 
const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'root',
database:'jfsd'
});

//verfiy whether db is connected or not 
db.connect(
err=>{
    if(err){
        console.error('connection is not established with the dB',err)
    }
    else{
        console.log('connected to the dB')
    }
});

app.listen(port,()=>{console.log('server port established on 3000')})

//endpoints - request points --> localhost:3000/insert

//get all the product ->select * from product
app.get('/getUsers',(req,res)=>{
    const sql='select * from user_details'; 
    db.query(sql,(err,result)=>{
     if(err){
         console.error('Error in fetching the users Details',err);
         res.status(500).json({error:'An error occured '});
         } 
         else{
             res.status(200).json(result);
         }  
    });
 });

//to get a product via id 
app.get('/getUser/:email',(req,res)=>{
    
    const email=req.params.email;
    console.log("in get user"+email);
    const sql='select * from user_details where email=?'; 
    db.query(sql,[email],(err,result)=>{
     if(err){
         console.error('Error in fetching the user details',err);
         res.status(500).json({error:'An error occured '});
         } 
         else{
             res.status(200).json(result);
         }  
    });
 });


//get all the product ->select * from product
app.get('/getMeetings',(req,res)=>{
    const sql='select * from meeting_details'; 
    db.query(sql,(err,result)=>{
     if(err){
         console.error('Error in fetching the meeting Details',err);
         res.status(500).json({error:'An error occured '});
         } 
         else{
             res.status(200).json(result);
         }  
    });
 });
 
 //to get a product via id 
 app.get('/getMeeting/:id',(req,res)=>{
    console.log("in getmeeting()");
    const id=req.params.id;
    console.log("id:"+id);
     const sql='select * from meeting_details where scheduled_by=?'; 
     db.query(sql,[id],(err,result)=>{
      if(err){
          console.error('Error in fetching the meeting details',err);
          res.status(500).json({error:'An error occured '});
          } 
          else{
              res.status(200).json(result);
          }  
     });
  });
 
 
  //insert the data
  app.post('/addUser',(req,res)=>{
     const {name,email,address,pwd}=req.body;
     console.log(name);
     console.log(email);
     console.log(address);
     console.log(pwd);
     const sql='insert into user_details values(0,?,?,?,?) '; 
     db.query(sql,[name,email,address,pwd],(err,result)=>{
      if(err){
          console.error('Error in adding the User',err);
          res.status(500).json({error:'An error occured '});
          } 
          else{
              res.status(200).json({message:'User added Successfully..'});
              console.log('user added')
          }  
     });
  });

  //insert the data
  app.post('/addMeeting',(req,res)=>{
    console.log(" in add meeting")
    console.log(req.body)
    const {topic,no_of_ppl,startTime,scheduled_by}=req.body;
    const sql='insert into meeting_details values(?,?,?,?) '; 
    db.query(sql,[topic,no_of_ppl,startTime,scheduled_by],(err,result)=>{
     if(err){
         console.error('Error in adding the meeting',err);
         res.status(500).json({error:'An error occured '});
         } 
         else{
             res.status(200).json({message:'Meeting added Successfully..'});
             console.log('product added')
         }  
    });
 });
 
 //update the data 
 app.put('/updateproduct',(req,res)=>{
     const {id,name,orderdate,ordertime}=req.body;
     const sql='update product set name=?,orderdate=?,ordertime=? where id=? '; 
     db.query(sql,[name,orderdate,ordertime,id],(err,result)=>{
      if(err){
          console.error('Error in update the product',err);
          res.status(500).json({error:'An error occured '});
          } 
          else{
              res.status(200).json({message:'Product updated Successfully..'});
              console.log('product updated')
          }  
     });
  });
 
 
  //delete the data 
  app.delete('/deleteMeeting',(req,res)=>{
    const param1 = req.query.topic;
    const param2 = req.query.scheduled_by;
    console.log("in delete -------p1"+ param1+" p2 "+ param2 );
     const sql='delete from meeting_details where topic=? and scheduled_by=?'; 
     db.query(sql,[param1,param2],(err,result)=>{
      if(err){
          console.error('Error in deleting the meeting',err);
          res.status(500).json({error:'An error occured '});
          } 
          else{
              res.status(200).json({message:'Meeting deleted Successfully..'});
          }  
     });
  });

  app.delete('/deleteUser/:email',(req,res)=>{
    const id=req.params.id;
    const sql='delete from user_details where email=?'; 
    db.query(sql,[email],(err,result)=>{
     if(err){
         console.error('Error in deleting the user',err);
         res.status(500).json({error:'An error occured '});
         } 
         else{
             res.status(200).json({message:'User deleted Successfully..'});
         }  
    });
 });
 