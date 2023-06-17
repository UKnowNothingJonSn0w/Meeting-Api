import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeResult = '';

  disableOnlineMeeting = new FormControl(false);
  disableAddress = new FormControl(false);
taskname = '';
  selectedMeetingType: undefined;
  value = '';
  uploadedFiles: File[] = [];
  tasks: string[] = []; // Lista zadań

  getButtonToggleClass(meetingType: string): string {
    return this.selectedMeetingType === meetingType ? 'selected' : '';
  }


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }


  removeFile(file: File) {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  open(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'Save click') {
          if (this.taskname.trim() !== '') { // Sprawdzanie czy Task Name nie jest pusty
            this.tasks.push(this.taskname); // Dodanie Task Name do listy zadań
            this.taskname = ''; // Wyczyszczenie wartości po dodaniu do listy
          }
        }
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }
}
