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
});
