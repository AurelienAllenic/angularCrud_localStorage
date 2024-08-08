import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  trackByFn(index: number, item: Student): number {
    return item.id;
  }
  @ViewChild('myModal') model : ElementRef | undefined
  studentObj: Student = new Student();
  studentsList: Student[] = []

  ngOnInit(): void {
      const localData = localStorage.getItem('angularcrud')
      if(localData != null){
        this.studentsList = JSON.parse(localData)
      }
  }

  openModel(){
    const model = document.getElementById('myModal')
    console.log(model, 'model')
    if(model != null){
      model.style.display ="block"
    }else{
      alert('no model')
    }
  }

  closeModel(){
    this.studentObj = new Student;
    if(this.model != null){
      this.model.nativeElement.style.display = 'none'
    }
  }
  saveStudent(){
    const isLocalPresent= localStorage.getItem('angularcrud');
    if(isLocalPresent != null){
      const oldArray =  JSON.parse(isLocalPresent)
      this.studentObj.id = oldArray.length +1;
      oldArray.push(this.studentObj);
      this.studentsList = oldArray;
      localStorage.setItem("angularcrud", JSON.stringify(oldArray))
    }else{
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentsList = newArr;
      localStorage.setItem("angularcrud", JSON.stringify(newArr))
    }
    this.closeModel()
  }
  OnEdit(item : Student){
    this.studentObj = item;
    this.openModel();
  }
  OnDelete(item : Student){
    const isDelete = confirm('Are you sure you want to delete this student infos ?')
    if(isDelete){
      const currentRecord = this.studentsList.findIndex(m=> m.id === this.studentObj.id);
      this.studentsList.splice(currentRecord, 1)
      localStorage.setItem("angularcrud", JSON.stringify(this.studentsList))
    }
  }
  updateStudent(){
      const currentRecord = this.studentsList.find(m => m.id === this.studentObj.id);
      if(currentRecord !== undefined){
        currentRecord.name = this.studentObj.name
        currentRecord.address = this.studentObj.address
        currentRecord.city = this.studentObj.city
        currentRecord.state = this.studentObj.state
        currentRecord.mobileNo = this.studentObj.mobileNo
        currentRecord.email = this.studentObj.email
        currentRecord.pincode = this.studentObj.pincode
      }
      localStorage.setItem("angularcrud", JSON.stringify(this.studentsList))
      this.closeModel()
  }
}


export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor(){
    this.id = 0;
    this.address = '';
    this.city='';
    this.email='';
    this.mobileNo='';
    this.name='';
    this.state='';
    this.pincode='';
  }
}