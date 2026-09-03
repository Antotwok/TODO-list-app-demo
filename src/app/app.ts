import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoCalendar } from './todo-calendar/todo-calendar';
import { Todo, TodoFilter, TodoView } from './todo.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TodoCalendar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  newTodo = '';
  newDueDate = '';

  filter: TodoFilter = 'all';
  view: TodoView = 'list';

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
      completed: false,
      dueDate: this.newDueDate || undefined
    });

    this.newTodo = '';
    this.newDueDate = '';
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }

  updateDueDate(todo: Todo, dueDate: string) {
    todo.dueDate = dueDate || undefined;
  }

  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  setView(view: TodoView) {
    this.view = view;
  }

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }
}
