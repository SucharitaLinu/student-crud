import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
//declare var bootstrap: any; 

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'] // Ensure this is correct
})
export class StudentComponent implements OnInit {
  showadd: boolean = false;
  showupdate: boolean = false;

  formValue: FormGroup;
  studentList: any[] = []; // Dynamic array to hold student data
  currentEditIndex: number | null = null; // Index of student being edited
  allSelected: boolean = false;

  constructor(private formBuilder: FormBuilder , private router: Router ) {}   //private toastr: ToastrService
  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      city: ['', Validators.required],
    });
    // // Initialize Bootstrap tooltips
    // const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // tooltipElements.forEach((element: any) => {
    //   new bootstrap.Tooltip(element);
    // });
  
  }

  add() {
    this.showadd = true;
    this.showupdate = false;
    this.formValue.reset(); // Clear the form for new entries

    //this.toastr.success('Student added successfully!');
  }

  addStudent() {
    const newStudent = this.formValue.value; // Get form data
    this.studentList.push(newStudent); // Add new student to the list
    console.log(this.studentList);
    this.formValue.reset(); // Reset the form
    this.showadd = false; // Close the modal
  }

  editStudent(index: number) {
    this.currentEditIndex = index;
    const student = this.studentList[index];
    this.formValue.patchValue(student); // Populate the form with student data
    this.showadd = false;
    this.showupdate = true;
  }

  
  updateStudent() {
    if (this.currentEditIndex !== null) {
      this.studentList[this.currentEditIndex] = this.formValue.value; // Update the student
      this.currentEditIndex = null;
    }
    if(confirm('Are you sure you want to  update ?')) {
    this.formValue.reset(); // Reset the form
    this.showupdate = false; // Close the modal
    }
  }

  deleteStudent(index: number) {
   if(confirm('Are you sure you want to delete ?')) {
    this.studentList.splice(index, 1); // Remove the student from the list
   }
  }
  toggleSelectAll(event: any) {
    this.allSelected = event.target.checked;
    this.studentList.forEach((student) => (student.selected = this.allSelected));
  }

  updateSelection() {
    this.allSelected = this.studentList.every((student) => student.selected);
  }

  hasSelectedStudents(): boolean {
    return this.studentList.some((student) => student.selected);
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete the selected students?')) {
      this.studentList = this.studentList.filter((student) => !student.selected);
      this.allSelected = false; // Reset "Select All" checkbox
    }
  }

  
}
