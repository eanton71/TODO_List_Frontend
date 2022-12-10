import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ItemShow } from '../models/item-show';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  //To do
  //Define the route address to the server
  private url_get = '';
  private url_post = '';
  private url_put = '';
  private url_delete = '';


  constructor(private httpClient:HttpClient) { }

  getTodoList():Observable<ItemShow[]>{
    return this.httpClient.get<ItemShow[]>(this.url_get,{observe:'body'}).pipe(catchError(this.handleError<any>('getTodoList')));
  }

  addTodo(description:string):Observable<object>{

    let date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1) < 10?'0'+(date.getMonth() + 1).toString():(date.getMonth() + 1).toString();
    const day = date.getDate() < 10?'0'+date.getDate().toString():date.getDate().toString();
    const hour = date.getHours() < 10?'0'+date.getHours().toString()+':':date.getHours().toString()+':';
    const minutes = date.getMinutes() < 10?'0'+date.getMinutes().toString():date.getMinutes().toString();

    const finaldate = year+'-'+month+'-'+day+' '+hour+minutes;

    const data = {description:description,created_at:finaldate};

    return this.httpClient.post(this.url_post,data,{observe:'body'}).pipe(catchError(this.handleError<any>('addTodo')));
  }

  editTodo(id:string,description:string):Observable<object>{

    const data = {id:id,description:description};

    return this.httpClient.put(this.url_put,data,{observe:'body'}).pipe(catchError(this.handleError<any>('editTodo')));
  }

  deleteTodo(id:string):Observable<object>{
    const param = '/'+id;

    return this.httpClient.delete(this.url_delete+param,{observe:'body'}).pipe(catchError(this.handleError<any>('deleteTodo')));
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> =>{
      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
