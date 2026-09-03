import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.model';

interface CalendarDay {
  date: Date;
  dateKey: string;
  inCurrentMonth: boolean;
  todos: Todo[];
}

@Component({
  selector: 'app-todo-calendar',
  imports: [],
  templateUrl: './todo-calendar.html',
  styleUrl: './todo-calendar.css'
})
export class TodoCalendar {

  @Input() todos: Todo[] = [];

  @Output() toggleTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<Todo>();

  currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  readonly weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get monthLabel(): string {
    return this.currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  }

  get weeks(): CalendarDay[][] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());

    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      const dateKey = this.toDateKey(date);

      days.push({
        date,
        dateKey,
        inCurrentMonth: date.getMonth() === month,
        todos: this.todos.filter(t => t.dueDate === dateKey)
      });
    }

    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  today() {
    this.currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }

  private toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
