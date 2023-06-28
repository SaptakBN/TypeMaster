import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  para:string='There are a number of distinctions between reading books and watching television. The time allotted to each programme on television is limited. On the other hand, there is a large selection of books that can be chosen from. Reading fulfils a man. Reading books does not have a time limit. TV provides visual images, but viewers have a limited selection of programmes to choose from. He must adapt to the scheduled programmes of a specific television channel. However, in the case of the book, the reader’s imagination is crucial. He is free to read a book as a personal activity.'
  text_input:string=''
  paraArr:string[]=this.para.split('');
  wordArr:string[]=this.para.split(' ');
  inputArr:string[]=[];
  mistake:number=0;
  wrong:any[]=[];
  space:string=' ';
  time:number=60;
  textField:boolean=true;
  wpm!:any;
  accuracy!:any;

  ngOnInit(): void {

  }
spaceCheck(){
  if(this.text_input.includes('  ')){
    this.text_input=this.text_input.replace('  ',' ');
  }
}
OnFail(){
  this.inputArr=this.text_input.split(' ');
  if(this.text_input=='' || this.para.startsWith(this.text_input)){
      console.log(1);
      this.mistake=0;
      this.wrong=[];
      console.log(this.wrong);
    }
    else{
      this.inputArr.forEach((char,index)=>{
        if(char!=this.wordArr[index] && !this.wrong.includes(this.wordArr[index]) && !this.wordArr[index].startsWith(char)){
          this.mistake++;
          this.wrong.push(this.wordArr[index]);
        }
        else if(char==this.wordArr[index] && this.wrong.includes(this.wordArr[index])){
          this.mistake--;
          this.wrong.splice(this.wrong.indexOf(this.wordArr[index]),1)
          console.log(2,this.wrong);
        }
      })
  }
   }
   startTest(){
    this.textField=false;
      let timer=setInterval(()=>{
        if(this.time>0){
          this.time=this.time-1;
        }
        else{
          this.textField=true;
          clearInterval(timer);
          this.wpm=this.inputArr.length
          this.accuracy=(100-((this.mistake/this.wpm)*100)).toFixed(2);
        }
      },1000);
   }
   ResetTest(){
    this.time=6
   }
}
