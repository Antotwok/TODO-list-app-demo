import { TestBed } from '@angular/core/testing';
import { TodoCalendar } from './todo-calendar';
import { Todo } from '../todo.model';

describe('TodoCalendar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCalendar],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoCalendar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should only place todos with a due date on the matching calendar day', () => {
    const fixture = TestBed.createComponent(TodoCalendar);
    const component = fixture.componentInstance;

    const year = component.currentMonth.getFullYear();
    const month = String(component.currentMonth.getMonth() + 1).padStart(2, '0');
    const dueDate = `${year}-${month}-10`;

    const todos: Todo[] = [
      { id: 1, title: 'Has due date', completed: false, dueDate },
      { id: 2, title: 'No due date', completed: false },
    ];
    component.todos = todos;

    const allCalendarTodos = component.weeks.flat().flatMap(day => day.todos);
    expect(allCalendarTodos.length).toBe(1);
    expect(allCalendarTodos[0].title).toBe('Has due date');
  });

  it('should navigate between months', () => {
    const fixture = TestBed.createComponent(TodoCalendar);
    const component = fixture.componentInstance;
    const startMonth = component.currentMonth.getMonth();

    component.nextMonth();
    expect(component.currentMonth.getMonth()).toBe((startMonth + 1) % 12);

    component.previousMonth();
    expect(component.currentMonth.getMonth()).toBe(startMonth);
  });
});
