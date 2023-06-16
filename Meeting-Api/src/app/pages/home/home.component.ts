import { Component, OnInit, TemplateRef } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  disableOnlineMeeting = new FormControl(false);
  disableAddress = new FormControl(false);

  selectedMeetingType: undefined;
  value = '';
  uploadedFiles: File[] = [];

  getButtonToggleClass(meetingType: string): string {
    return this.selectedMeetingType === meetingType ? 'selected' : '';
  }


  constructor(public dialog: MatDialog) { }

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

}
