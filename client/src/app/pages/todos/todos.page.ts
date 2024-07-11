import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonLoading,
  IonIcon,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonIcon,
    IonLoading,
    IonLabel,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    IonCardContent,
  ],
})
export class TodosPage implements OnInit {
  public error: any;
  public isLoading: boolean = false;
  private todoService = inject(TodoService);
  public todos: any;

  private router = inject(Router);
  constructor() {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.isLoading = true;
    this.todoService.getAllTodo().subscribe({
      next: (res) => {
        this.todoService.allTodos.next(res.data);
        this.todos = res.data;
      },
      error: (err: any) => {
        alert('Api Call Error' + err.error.message);
        this.error = err.message;
        this.isLoading = false;
      },
      complete: () => {
        console.log('success!!!');
        this.isLoading = false;
      },
    });
  }

  deleteTask(id: string) {
    this.isLoading = true;
    this.todoService.deleteTodo(id).subscribe({
      next: (res) => {
        if (res.data) {
          alert('Task Deleted');
          this.getTodos();
        }
      },
      error: (err: any) => {
        alert('Api Call Error' + err.error.message);
        this.error = err.message;
        this.isLoading = false;
      },
      complete: () => {
        console.log('success!!!');
        this.isLoading = false;
      },
    });
  }

  onEdit(todoId: string): void {
    this.router.navigate(['/update-todo'], { queryParams: { id: todoId } });
  }
}
