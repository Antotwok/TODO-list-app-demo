import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  newTodo = '';

  todos: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      completed: false
    },
    {
      id: 2,
      title: 'Prepare Claude Code demo',
      completed: false
    },
    {
      id: 3,
      title: 'Build TODO application',
      completed: true
    }
  ];

  addTodo() {
    if (!this.newTodo.trim()) {
      return;
    }

    this.todos.push({
      id: Date.now(),
      title: this.newTodo,
      completed: false
    });

    this.newTodo = '';
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }
}