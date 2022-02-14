import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictoegame',
  templateUrl: './tictoegame.component.html',
  styleUrls: ['./tictoegame.component.css']
})
export class TictoegameComponent implements OnInit {

  gamePad:Array<any> = [[]];
  nextTurn:string = null;
  currentTurn:string = null;
  message: string = null;
  stpes:number = 0;
  result:number = -1;
  element:number = 0;

  constructor() { }

  ngOnInit() {
    this.gamePad.length = 3;
    this.nextTurn = null;
    this.currentTurn = null;
    this.message = null;
    this.prepareGamePad();
  }

  prepareGamePad(): void {
    this.nextTurn = this.currentTurn = this.message = null;
    this.result = -1;
    for (let row = 0; row < this.gamePad.length; row++) {
      this.gamePad[row] = new Array(3)
    }
  }

  verifyInput(row, col, e): any {
    let r = parseInt(row)
    let c = parseInt(col);
    let input = e.target.value;
    let isWinFromRowCol = false;
    let isWinFromDiagonal = false;
    this.gamePad[r][c] = input;

    if(this.currentTurn != input) {
      this.message = null;
      this.currentTurn = input;
      e.target.disabled = true;
      this.stpes++;
    } else {
      this.gamePad[r][c] = null;
      this.message = "You need to put "+this.nextTurn;
      e.target.value = null;
      return;
    }

    this.nextTurn = (input == "X") ? "Y" : "X";

    if(this.stpes >= 3) {
      isWinFromRowCol = this.checkRowColumn(r,c);
      isWinFromDiagonal = this.checkDigonal();
    }

    if(isWinFromRowCol || isWinFromDiagonal){
      this.result = 1;
      this.message = this.currentTurn+" is winner";
    }
  }

  checkDigonal():any {
    let firstValue = null;
    let lcount = 1;
    let rcount = 1;

    for(let i = 0; i < this.gamePad.length; i++) {
      if(i == 0) {
        firstValue = this.gamePad[i][i];
      } else {
        if(this.gamePad[i][i] !== undefined && firstValue == this.gamePad[i][i]) {
          lcount++;
        }
      }
    }

    if(lcount == this.gamePad.length) {
      return true;
    }

    for(let i = 0; i < this.gamePad.length; i++) {
      if(i == 0) {
        firstValue = this.gamePad[this.gamePad.length-1-i][i];
      } else {
        if(this.gamePad[this.gamePad.length-1-i][i] !== undefined && firstValue == this.gamePad[this.gamePad.length-1-i][i]) {
          rcount++;
        }
      } 
    }

    if(rcount == this.gamePad.length) {
      return true
    }
    return false;
  }

  checkRowColumn(row:number, col:number):any {
    let c = 0;
    let r = row;
    let firstValue = null;
    let colMatch  = 0
    let rowMatch = 0;
    let length = this.gamePad.length;

    // Check row
    while(c < length) {
      firstValue = this.gamePad[r][0];
      if(firstValue !== undefined && firstValue == this.gamePad[r][c]) {
        rowMatch++;
      }
      c++; 
    }

    if(rowMatch >= length){
      return true;
    }

    // Check col
    if(rowMatch < length) {
      c = col;
      r = 0;
      while(r < length) {
        firstValue = this.gamePad[0][c];
        if(firstValue !== undefined && firstValue == this.gamePad[r][c]) {
          colMatch++;
        }
        r++; 
      }
    }

    if(colMatch >= length){
      return true;
    }

    return false;
  }
}