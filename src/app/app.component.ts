import { Component } from '@angular/core';
import { Item } from './models/item';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';



  editActive:boolean = false;
  id:string;
  description:string;
  allItems:Item[] = [];

  constructor(private todolist:TodolistService){
    this.id = '';
    this.description = '';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getItems();
  }

  getItems():void{
    this.todolist.getTodoList().subscribe((result:Item[])=>this.allItems = result);
  }


  addItem(description: string) {

    if(description === ''){
      return;
    }





    this.todolist.addTodo(description).subscribe(result=>{
      if(result){
        this.getItems();
      }
    })

  }

  editTodo(index:number):void{

    this.editActive = true;
    this.id = this.allItems[index]._id;
    this.description = this.allItems[index].description;


  }

  sendEditTodo():void{

    this.todolist.editTodo(this.id,this.description).subscribe(result=>{
      if(result){
        this.getItems();
      }
    })

  }

  deleteItem(index:number):void{


    this.todolist.deleteTodo(this.allItems[index]._id).subscribe(result=>{
      if(result){
        this.getItems();
      }
    })

  }
}
