import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Board {
  completed: boolean;
  label: string;
  checked: boolean;
  department: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedMeetingType: undefined;
  disableOnlineMeeting = new FormControl(false);
  value = '';
  disableAddress = new FormControl(false);
  uploadedFiles: File[] = [];
  taskname = '';
  tasks: string[] = [];
  editedTask: string = '';

  checklist: any;
  checkedList: any;
  allComplete: boolean = false;
  closeResult = '';
  allChecked = false;

  @ViewChild('editModal') editModal: any;

  typesOfBoard: Board[] = [
    { label: 'Wade Warren', completed: false, checked: false, department: 'Chair of the board' },
    { label: 'Floyd Miles', completed: false, checked: false, department: 'Board member' },
    { label: 'Brooklyn Simmons', completed: false, checked: false, department: 'Board member' },
    { label: 'Guy Hawkins', completed: false, checked: false, department: 'Board secretary' },
    { label: 'Darrell Steward', completed: false, checked: false, department: 'Board trasurer' },
  ];
  filteredBoard: Board[] = [...this.typesOfBoard];
  searchText: string = '';
  alertVisible = false;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.updateAllComplete();
  }

  getButtonToggleClass(meetingType: string): string {
    return this.selectedMeetingType === meetingType ? 'selected' : '';
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
          if (this.taskname.trim() !== '') {
            this.tasks.push(this.taskname);
            this.taskname = '';
            this.alertVisible = true;
            setTimeout(() => {
              this.alertVisible = false;
            }, 3000);

          }
        }
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }

  removeTask(task: string): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }


  openEditModal(task: string) {
    this.editedTask = task;

    this.modalService.open(this.editModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'Save click') {

        }
      },
      (reason) => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }


  saveTask() {
    const index = this.tasks.indexOf(this.editedTask);
    if (index !== -1) {
      this.tasks[index] = this.taskname;
    }
    this.modalService.dismissAll('Save click');
  }

  filterBoard(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredBoard = this.typesOfBoard.filter(Board =>
      Board.label.toLowerCase().includes(filterValue) || Board.department.toLowerCase().includes(filterValue)
    );
  }


  updateAllComplete() {
    this.allComplete = this.typesOfBoard != null && this.typesOfBoard.every(Board => Board.checked);
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.typesOfBoard == null) {
      return;
    }
    this.typesOfBoard.forEach(Board => Board.checked = completed);
  }




}
