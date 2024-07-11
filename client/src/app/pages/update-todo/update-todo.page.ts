import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonCard, IonCardContent, IonIcon, IonInput, IonButton, IonSelectOption, IonSelect } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonCard, IonCardContent, IonIcon, IonInput, IonButton, IonSelectOption, IonSelect, ReactiveFormsModule]
})
  export class UpdateTodoPage implements OnInit {

  private route= inject(ActivatedRoute);
  private todoService= inject(TodoService);
  private oldData:any;
  private todoId:any;

  formData:FormGroup= new FormGroup({});

  constructor() {
    
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(query => {
      this.todoId = query.get('id');
      const matchData= this.todoService.allTodos._value.find((data:any)=> data._id === this.todoId);
      this.oldData= matchData;
    });

    this.formData= new FormGroup({
      task: new FormControl(this.oldData.task),
      status: new FormControl(this.oldData.status),
      assignTo: new FormControl(this.oldData.assignTo),
    })
   
  }

  onUpdate(){
    console.log(this.formData.value);
    this.todoService.updateTodo(this.formData.value, this.todoId).subscribe({
      next: (res:any) => {
        if (res.result) {
          alert('Task Updated Succesfully');
          this.todoService.getAllTodo();
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err);
      },
      complete: () => {
        console.log('success!!!');
        alert('Task Updated Succesfully');
      },
    });
  }
  
}
