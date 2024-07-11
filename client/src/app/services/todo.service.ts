import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoResponse } from '../model/interfaces';

const apiUrl= "http://localhost:3333/api/v1";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  
  public allTodos:any= new BehaviorSubject([]);
  private http= inject(HttpClient);
  

  constructor() { }

  getAllTodo():Observable<TodoResponse>{
    return this.http.get<TodoResponse>(`${apiUrl}/getAllTodo`)
  }

  postTodo(data:any):Observable<TodoResponse>{
    return this.http.post<TodoResponse>(`${apiUrl}/createTodo`, data)
  }

  updateTodo(data:any, id:string):Observable<TodoResponse>{
    return this.http.patch<TodoResponse>(`${apiUrl}/updateTodo?id=${id}`, data)
  }

  deleteTodo(id:string):Observable<TodoResponse>{
    return this.http.delete<TodoResponse>(`${apiUrl}/deleteTodo?id=${id}`)
  }

}
