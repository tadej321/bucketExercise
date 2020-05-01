import {AuthService} from './auth.service';
import {fakeAsync, async, getTestBed, TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BucketService} from '../bucket-list/bucket.service';
import {Observable, of} from 'rxjs';

describe('AuthService', () => {

  let authService: AuthService;
  const injector: TestBed = getTestBed();
  const myProvider = environment;
  let httpMock: HttpTestingController;
  const url = environment.backendApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    });
    httpMock = injector.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('#token should be undefined after construction', () => {
    expect(authService.getToken()).toBeUndefined();
  });

  it('#isAuthenticated should be false after construction', () => {
    expect(authService.getIsAuth()).toEqual(false);
  });

  it('should return #authStatusListener subjects value as false', async ((done: DoneFn) => {
    authService.getAuthStatusListener().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  }));

  it('should make a post request to the server to login',  () => {
    const testLoginData = {
      email: 'testEmail',
      password: 'testPass'
    };
    authService.login(testLoginData.email, testLoginData.password);

    const request = httpMock.expectOne(`${url}/auth/login`);

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(testLoginData);

    httpMock.verify();
  });

  it('should automatically authenticate the user', () => {
    const now = new Date();

    localStorage.setItem('token', 'testToken');
    localStorage.setItem('expiration', new Date(now.setDate(now.getDate() + 1)).toISOString());
    localStorage.setItem('userId', 'testId');

    authService.autoAuthUser();

    expect(authService.getIsAuth()).toEqual(true);
    expect(authService.getToken()).toEqual(localStorage.getItem('token'));

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  });

  it('should logout the user', () => {
    const now = new Date();

    localStorage.setItem('token', 'testToken');
    localStorage.setItem('expiration', new Date(now.setDate(now.getDate() + 1)).toISOString());
    localStorage.setItem('userId', 'testId');

    authService.logout();

    expect(localStorage.length).toEqual(0);
    expect(authService.getToken()).toBe(null);
    expect(authService.getIsAuth()).toEqual(false);
  });

});
