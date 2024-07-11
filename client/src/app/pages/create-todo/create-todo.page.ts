import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonButton,
  IonSelectOption,
  IonSelect, IonSpinner } from '@ionic/angular/standalone';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoResponse } from 'src/app/model/interfaces';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    IonButton,
    IonInput,
    IonIcon,
    IonCardContent,
    IonCard,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonSelectOption,
    IonSelect,
  ],
})
export class CreateTodoPage implements OnInit {
  todoForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  private todoService = inject(TodoService);

  constructor() {
    this.todoForm = new FormGroup({
      task: new FormControl(''),
      status: new FormControl(''),
      assignTo: new FormControl(''),
    });
  }

  ngOnInit() {}

  todoSubmit() {
    this.isLoading = true;
    this.todoService.postTodo(this.todoForm.value).subscribe({
      next: (res: TodoResponse) => {
        if (res.data) {
          alert('Task Created Succesfully');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err.error.message);
        this.isLoading = false;
      },
      complete: () => {
        console.log('success!!!');
        this.isLoading = false;
      },
    });
  }
}
