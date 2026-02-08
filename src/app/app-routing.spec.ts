import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

describe('AppRouting', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, RouterTestingModule, HttpClientTestingModule, LayoutModule],
      declarations: [AppComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should redirect empty path to /dashboard', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/dashboard');
  });

  it('should navigate to /dashboard', async () => {
    await router.navigate(['/dashboard']);
    expect(location.path()).toBe('/dashboard');
  });

  it('should navigate to /movies', async () => {
    await router.navigate(['/movies']);
    expect(location.path()).toBe('/movies');
  });

  it('should redirect unknown paths to /dashboard', async () => {
    await router.navigate(['/nonexistent']);
    expect(location.path()).toBe('/dashboard');
  });
});
