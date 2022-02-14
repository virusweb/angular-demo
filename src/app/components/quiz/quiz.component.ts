import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  question: any;
  answers: Array<any> = [];
  modalRef: BsModalRef;
  totalQuestions: number = 0;
  questionIndex: number = 0;
  totalAvailableIndex: number = 0;
  availableNext: boolean = false;
  availablePrev: boolean = false;
  error: boolean;
  errorMsg: string;
  result: any;
  remainigTime: number = 60;
  submitted:boolean = false;
  interval: any = 60;

  @ViewChild('timer') modalTemplate: TemplateRef<any>;

  constructor(private quizservice: QuizService, private modalService: BsModalService) { }

  ngOnInit() {
    this.startCountdown();
    this.questionIndex = sessionStorage.getItem('qi') ? parseInt(sessionStorage.getItem('qi')) : this.questionIndex;
    this.answers = JSON.parse(sessionStorage.getItem('answers'));
    this.getQuestion(this.questionIndex);
  }

  getQuestion(questionIndex: number): void {

    this.availableNext = false;
    this.availablePrev = false;

    this.questionIndex = (questionIndex) ? questionIndex : this.questionIndex;
    sessionStorage.setItem('qi', this.questionIndex.toString());

    this.quizservice.fetchQuestions(questionIndex).subscribe(res => {
      if (res && res.status && res.question) {
        this.question = res.question;
        this.totalQuestions = res.totalQuestions;
        this.totalAvailableIndex = this.totalQuestions - 1;

        if (this.questionIndex < this.totalAvailableIndex) {
          this.availableNext = true;
        }

        if (this.questionIndex >= 1 && this.questionIndex <= this.totalAvailableIndex) {
          this.availablePrev = true;
        }
      }
    });
  }

  collect(qid, oid): void {
    if (this.answers) {
      const answeredIndex = this.answers.findIndex(ans => {
        return (ans.questionID === qid);
      })

      if (answeredIndex >= 0) {
        this.answers[answeredIndex].selectedOptionID = oid;
      } else {
        this.answers.push({ questionID: qid, selectedOptionID: oid });
        sessionStorage.setItem('answers', JSON.stringify(this.answers));
      }
    } else {
      this.answers = [];
      this.answers.push({ questionID: qid, selectedOptionID: oid });
      sessionStorage.setItem('answers', JSON.stringify(this.answers));
    }
  }

  getNextQuestion(): void {

    this.error = false;
    this.errorMsg = null;

    if (this.questionIndex < this.totalAvailableIndex) {
      this.questionIndex = this.questionIndex + 1;
      this.getQuestion(this.questionIndex)
    } else {
      this.error = true;
      this.errorMsg = "No more questions !";
    }

  }

  getPreviousQuestion(): void {
    this.error = false;
    this.errorMsg = null;

    this.questionIndex = this.questionIndex - 1;

    if (this.questionIndex < 0) {
      this.error = true;
      this.errorMsg = "No more questions !";
    } else {
      this.getQuestion(this.questionIndex);
    }
  }

  reset(): void {
    if (this.modalRef) { this.modalRef.hide() };
    this.submitted = false;
    sessionStorage.clear();
    clearInterval(this.interval);
    this.remainigTime = 60;
    this.questionIndex = 0;
    this.answers = [];
    this.error = false;
    this.errorMsg = null;
    this.availableNext = false;
    this.availablePrev = false;
    this.getQuestion(this.questionIndex);
    this.startCountdown();
  }

  openResetConfirmModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  resetConfirm(sure): void {
    if (sure) {
      this.reset();
    }
    this.modalRef.hide();
  }

  isChecked(qid, oid): Boolean {

    let storedAnswers = (sessionStorage.getItem('answers')) ? JSON.parse(sessionStorage.getItem('answers')) : [];
    let checked = storedAnswers.findIndex(ans => {
      return (ans.questionID === qid && ans.selectedOptionID === oid);
    });

    return (checked >= 0) ? true : false;
  }

  openSubmitConfirmModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  submitConfirm(sure, template: TemplateRef<any>) {
    if (sure) {
      this.modalRef.hide();
      this.submitted = true;
      this.quizservice.makeResult(this.answers).subscribe(res => {
        if (res && res.status) {
          this.result = res.result;
          clearInterval(this.interval);
          this.modalRef = this.modalService.show(template, {
            backdrop: true,
            ignoreBackdropClick: true,
            keyboard: false
          });
        }
      });
    }
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.reset();
    clearInterval(this.interval);
  }

  startCountdown() {
    this.remainigTime = (sessionStorage.getItem('time')) ? parseInt(sessionStorage.getItem('time')) : this.remainigTime;
  
    this.interval = setInterval(() => {
      sessionStorage.setItem('time', this.remainigTime.toString());
      if (this.remainigTime == 0) {
        clearInterval(this.interval);
        this.openTimerModal(this.modalTemplate);
      } else {
        this.remainigTime--;
      }
    }, 1000);
  }

  openTimerModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      ignoreBackdropClick: true,
      keyboard: false
    });
  }
}