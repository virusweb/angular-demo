import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CountryService } from '../../services/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModalComponent } from '../../modules/sharable/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent) confirmationModal: ConfirmationModalComponent;

  countries: Array<any>;
  modalRef: BsModalRef;
  removableIndex: number;
  editForm: FormGroup;
  editCountry: any;
  editCountryIndex: any;
  updateSuccess: boolean = false;
  submitEditForm: boolean = false;
  deleteSuccess: boolean = false;
  addSuccess: boolean = false;
  showCorirmation: boolean = false;

  //For alert message
  showAlert: boolean = false;
  type: string = null;
  strongMsg: string = null;
  message: string = null;

  constructor(
    private modalService: BsModalService,
    private cs: CountryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      area: ['', Validators.required],
      population: ['', Validators.required],
    });
    this.getCountries();
  }

  getCountries(): void {
    this.cs.getCountries().subscribe(res => {
      if (res && res.status && res.data) {
        this.countries = res.data;
      }
    }, error => {
      let msg = error.message;
      this.showAlertMsg('danger', 'Error !', msg);
    });
  }

  remove(): void {
    const id = this.countries[this.removableIndex].id;

    this.cs.deleteCountry(id).subscribe(res => {
      if (res && res.status) {
        this.countries.splice(this.removableIndex, 1);
        this.deleteSuccess = true;
        this.showAlertMsg('danger', 'Success !', res.message);
      } else {
        let msg = (res && res.message) ? res.message : 'something went wrong';
        this.showAlertMsg('danger', 'Error !', msg);
      }
    }, error => {
      let msg = error.message;
      this.showAlertMsg('danger', 'Error !', msg);
    });
  }

  openEditModal(editModal: TemplateRef<any>, index?): void {

    this.resetAllData();

    if (index >= 0) {
      this.editCountryIndex = index;
      this.editCountry = this.countries[index];
      this.editForm.patchValue({
        name: this.countries[index].name,
        area: this.countries[index].area,
        population: this.countries[index].population,
        id: this.countries[index].id,
      });
    }

    this.modalRef = this.modalService.show(editModal, { keyboard: false, ignoreBackdropClick: true });
  }

  doUpdate(): void {
    this.submitEditForm = true;
    this.updateSuccess = false;

    if (!this.editForm.valid) {
      return;
    }

    let updatedData = this.editForm.value;

    if (updatedData.name && updatedData.area && updatedData.population) {
      if (this.editCountryIndex && this.editCountryIndex >= 0) {
        this.cs.editCountry(this.editForm.value).subscribe(res => {
          if (res && res.status) {
            this.countries[this.editCountryIndex].name = updatedData.name;
            this.countries[this.editCountryIndex].area = updatedData.area;
            this.countries[this.editCountryIndex].population = updatedData.population;
            this.updateSuccess = true;
            this.editCountry = null;
            this.editCountryIndex = null;
            this.showAlertMsg('info', 'Success !', res.message);
          } else {
            let msg = (res && res.message) ? res.message : 'something went wrong';
            this.showAlertMsg('success', 'Success !', msg);
          }
        }, error => {
          let msg = error.message;
          this.showAlertMsg('danger', 'Error !', msg);
        });
      } else {
        this.cs.addCountry(this.editForm.value).subscribe(res => {
          if (res && res.status) {
            this.countries.push({
              flag: 'en/4/41/Flag_of_India.svg',
              name: updatedData.name,
              area: updatedData.area,
              population: updatedData.population,
              id: res.data
            })
            this.addSuccess = true;
            this.showAlertMsg('success', 'Success !', res.message);
          } else {
            let msg = (res && res.message) ? res.message : 'something went wrong';
            this.showAlertMsg('danger', 'Error !', msg);
          }
        }, error => {
          let msg = error.message;
          this.showAlertMsg('danger', 'Error !', msg);
        });
      }
      this.closeEditModal();
    } else {
      this.closeEditModal();
    }
  }

  closeEditModal(): void {
    this.modalRef.hide();
  }

  resetAllData(): void {
    this.editCountry = null;
    this.editCountryIndex = null;
    this.editForm.reset();
    this.updateSuccess = false;
    this.submitEditForm = false;
    this.deleteSuccess = false;
    this.addSuccess = false;
    this.showAlert = false;
    this.type = null;
    this.strongMsg = null;
    this.message = null;
  }

  showAlertMsg(type, strongMsg, message): void {
    this.showAlert = true;
    this.type = type;
    this.strongMsg = strongMsg;
    this.message = message;
  }

  openConfirmModal(index) {
    this.removableIndex = index;
    this.confirmationModal.showChildModal();
  }

  getRemovedIndex(outputIndex) {
    this.removableIndex = outputIndex;
    this.remove();
  }
}