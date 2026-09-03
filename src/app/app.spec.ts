import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My TODO List');
  });

  it('should default to showing all todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.filteredTodos.length).toBe(app.todos.length);
  });

  it('should filter to only active todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setFilter('active');
    expect(app.filteredTodos.every(t => !t.completed)).toBe(true);
  });

  it('should filter to only completed todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setFilter('completed');
    expect(app.filteredTodos.every(t => t.completed)).toBe(true);
  });

  it('should default to the list view', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.view).toBe('list');
  });

  it('should switch to the calendar view', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setView('calendar');
    expect(app.view).toBe('calendar');
  });

  it('should create a todo with the selected due date', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.newTodo = 'Task with due date';
    app.newDueDate = '2026-01-15';
    app.addTodo();
    const created = app.todos[app.todos.length - 1];
    expect(created.dueDate).toBe('2026-01-15');
  });

  it('should create a todo without a due date when none is selected', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.newTodo = 'Task without due date';
    app.newDueDate = '';
    app.addTodo();
    const created = app.todos[app.todos.length - 1];
    expect(created.dueDate).toBeUndefined();
  });
});
