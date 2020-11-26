import { Component, OnInit } from '@angular/core';
import { Button } from 'protractor';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {


  constructor(private api:ChatbotService) { }
  answer=[];
  data:any=[];
  ngOnInit(): void {
  }
 
  

  massage(massage:any)
  {
    this.data=massage.split(' ');
    console.log(this.data);
    (<HTMLInputElement>document.getElementById("form__input")).value=''
    if(massage==''){
      alert("Please Enter the Question")
    }
    this.api.getMassage()
    .subscribe(data => {
      console.log(data)
      this.answer=data;
      for(let i=0;i<this.data.length;i++)
      {
        for(let j=0;j<this.answer.length;j++)
        {
          if(this.data[i]==this.answer[j].question){
            var userinput=document.createElement('div');
            userinput.innerHTML=this.data[i];
            userinput.id="user";
            userinput.className="chatarea-inner user"
            document.getElementById('massage').appendChild(userinput);
            var answer=document.createElement('div');
            answer.innerHTML=this.answer[j].answer;
            answer.className="chatarea-inner chatbot"
            document.getElementById('massage').appendChild(answer);
            this.buttonnew()
            // this. iddetail()
          }
        }
        
      }
    }, error => console.log(error));
  }
    buttonnew(){
     var newdata=["Make Appointment","Close"]
     for(let i=0;i<2;i++){
      var btn=document.createElement('button');
      btn.innerHTML=newdata[i];
      btn.id="user";
      btn.addEventListener("click", (e:Event) => this.functionwithparam(i));
      btn.className="chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);
     }
    }
    buttonnew1(){
      var newdata=["check you id","Close"]
      for(let i=0;i<2;i++){
       var btn=document.createElement('button');
       btn.innerHTML=newdata[i];
       btn.id="user";
       btn.addEventListener("click", (e:Event) => this.functionwithparam1(i));
        btn.className="chatarea-inner btn"
       document.getElementById('massage').appendChild(btn);
      
      }
     }
    
      functionwithparam(i:any){
       if(i==0){
        this.massagedetail()
        this. buttonnew1()
       }
       else if(i==1){
        console.log("Error")
       }
     }
     functionwithparam1(i:any){
      if(i==0){
        this.iddetail()
      }
      else if(i==1){
        this.buttonnew()
      }
    }
     iddetail(){
       var value=prompt("enter the id")
      console.log(value);
      this.api.getEmployeeById(value).subscribe( data => {
        console.log(data);

        var h2=document.createElement('p')
         h2.innerHTML="Your Booking Id -> "+data[0].id +" "+"Your Booking Name  -> "+data[0].name+"   FACE Prep is India's best platform to prepare for your dream tech job. We offer ProGrad Certification program, free interview preparation";
         h2.className="chatarea-inner btn"        
        document.getElementById('massage').appendChild(h2);
        this.buttonnew()

      });
     }

      massagedetail(){
     
       var name=prompt("enter the name")
       var random=Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
       console.log(name,random);
        this.api.putdetail(name,String(random)).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
        var h1=document.createElement("h3")
        h1.className="chatarea-inner btn"
        h1.innerHTML="Your Id "+random
        document.getElementById('massage').appendChild(h1);
  
    
     }
  
    }

