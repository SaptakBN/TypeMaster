import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  para: string =
    "It was difficult for him to admit he was wrong. He had been so certain that he was correct and the deeply held belief could never be shaken. Yet the proof that he had been incorrect stood right before his eyes. 'See daddy, I told you that they are real!' his daughter excitedly proclaimed.";
  text_input: string = '';
  paraArr: string[] = this.para.split('');
  wordArr: string[] = this.para.split(' ');
  inputArr: string[] = [];
  mistake: number = 0;
  wrong: any[] = [];
  time: number = 60;
  textField: boolean = true;
  wpm!: any;
  accuracy!: any;
  timer!: any;

  ngOnInit(): void {}
  spaceCheck() {
    if (this.text_input.includes('  ')) {
      this.text_input = this.text_input.replace('  ', ' ');
    }
  }
  OnFail() {
    this.inputArr = this.text_input.split(' ');
    if (this.text_input == '' || this.para.startsWith(this.text_input)) {
      console.log(1);
      this.mistake = 0;
      this.wrong = [];
      console.log(this.wrong);
    } else {
      this.inputArr.forEach((char, index) => {
        if (
          char != this.wordArr[index] &&
          !this.wrong.includes(this.wordArr[index]) &&
          (!this.wordArr[index].startsWith(char) ||
            (index < this.inputArr.length - 1 &&
              char.length != this.wordArr[index].length))
        ) {
          this.mistake++;
          this.wrong.push(this.wordArr[index]);
        } else if (
          char == this.wordArr[index] &&
          this.wrong.includes(this.wordArr[index])
        ) {
          this.mistake--;
          this.wrong.splice(this.wrong.indexOf(this.wordArr[index]), 1);
          console.log(2, this.wrong);
        }
      });
    }
    console.log(this.wrong);
  }
  startTest() {
    this.text_input = '';
    this.inputArr = [];
    this.time = 60;
    this.mistake = 0;
    this.wrong = [];
    this.textField = false;
    this.wpm = undefined;
    this.accuracy = undefined;
    this.timer = setInterval(() => {
      document.getElementById('input')?.focus();
      if (this.time > 0) {
        this.time = this.time - 1;
      } else {
        this.textField = true;
        clearInterval(this.timer);
        this.wpm =
          this.inputArr[this.inputArr.length - 1] == ''
            ? this.inputArr.length - 1
            : this.inputArr.length;
        this.accuracy = (100 - (this.mistake / this.wpm) * 100).toFixed(0);
        this.accuracy =
          this.accuracy <= 100 || this.accuracy >= 0 ? this.accuracy : 0;
        this.time = 60;
      }
    }, 1000);
  }
  ResetTest() {
    this.time = 60;
    this.mistake = 0;
    this.wrong = [];
    this.wpm = undefined;
    this.accuracy = undefined;
    clearInterval(this.timer);
    this.text_input = '';
    this.inputArr = [];
  }
  stopTest() {
    this.textField = true;
    clearInterval(this.timer);
  }
}
