import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Golden Raspberry Awards');
  });

  it('should render navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent.trim()).toBe('Dashboard');
    expect(links[1].nativeElement.textContent.trim()).toBe('Movies');
  });

  it('should have correct routerLink for Dashboard', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links[0].attributes['ng-reflect-router-link']).toBe('/dashboard');
  });

  it('should have correct routerLink for Movies', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links[1].attributes['ng-reflect-router-link']).toBe('/movies');
  });

  it('should have routerLinkActive directive on links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    links.forEach((link) => {
      expect(link.attributes['routerLinkActive']).toBeTruthy();
    });
  });
});
