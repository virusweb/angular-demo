import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Questions } from '../models/questions.model';
import * as data from '../../assets/json-files/questions.json';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  questions: Questions[];
  question: any;
  response: any;
  totalQuestions: number = 0;
  correct: number = 0;
  unattempt: number = 0;
  incorrect: number = 0;
  percentage: number = 0;

  fetchQuestions(index): any {

    this.response = {};
    this.response.question = [];
    this.questions = (data as any).default;

    if (this.questions && this.questions[index]) {
      this.question = this.questions[index];
      this.response.status = true;
      this.response.question = this.question;
      this.response.totalQuestions = this.questions.length;
    } else {
      this.response.status = false;
      this.response.question = [];
    }

    return of(this.response);
  }

  makeResult(answers): any {

    this.response = {};
    this.response.result = [];
    this.incorrect = 0;
    this.correct = 0;
    this.unattempt = 0;
    this.percentage = 0;

    if (answers && answers.length) {
      
      this.unattempt = this.questions.length - answers.length;
      
      answers.forEach(q => {
        let res = this.questions.find(a => {
          return q.questionID === a.id;
        });

        if (res) {
          if (res.answerID === q.selectedOptionID) {
            this.correct++;
          } else {
            this.incorrect++;
          }
        }
      });

      this.response.status = true;
      this.response.result.unattempt = this.unattempt;
      this.response.result.correct = this.correct;
      this.response.result.incorrect = this.incorrect;
      this.response.result.percentage = ((100 / this.questions.length) * this.correct);

    } else {
      this.response.status = true;
      this.response.result.unattempt = this.questions.length;
      this.response.result.correct = 0;
      this.response.result.incorrect = 0;
      this.response.result.percentage = 0;
    }

    this.response.result.totalquestions = this.questions.length;
    return of(this.response);
  }
}
