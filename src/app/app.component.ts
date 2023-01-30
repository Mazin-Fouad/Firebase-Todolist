import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos$: Observable<any>;
  todos: Array<any>;
  todoText: string = '';

  constructor(public firestore: Firestore) {
    const coll = collection(firestore, 'todos');
    this.todos$ = collectionData(coll);

    //More elegant way, e.g. shows popup or plays audio when update comes in HTML
    this.todos$.subscribe((newTodos) => {
      alert('New Todos Added');
      this.todos = newTodos;
    });
  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todoText });
  }
}
