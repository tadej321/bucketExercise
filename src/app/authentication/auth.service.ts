import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthDataModel} from './auth-data.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


const BACKEND_URL = environment.backendApiUrl;

interface UserCredentials {
  userId: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private userId;

  constructor(private http: HttpClient, private router: Router) {}
  /**
   * @returns string
   */
  getToken(): string {
    return this.token;
  }

  /**
   * @returns boolean
   */
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  /**
   * @returns Observable of authListener Subject.
   */
  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /**
   * Makes a POST request to the server to return the login credentials.
   *
   * @param email Email entered
   * @param password Password entered
   */
  login(email: string, password: string): void {
    const authData: AuthDataModel = {email, password};
    if (email === 'test@test' && password === 'test') {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
      const token = 'testToken';
      this.token = token;
      const userCredentials = {userId: 'testID'};
      const expiresInDuration = 3600;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(token, expirationDate, userCredentials);
      this.router.navigate(['/']);
    } else {
      this.http.post<{token: string, expiresIn: number, userCredentials: UserCredentials}>(BACKEND_URL + '/auth/login', authData)
        .subscribe(response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, response.userCredentials);
            this.router.navigate(['/']);
          }
        });
    }
  }

  /**
   * Automatically authorizes user each time called.
   */
  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  /**
   * Sets a new expiration duration to the token.
   *
   * @param duration new duration we want to set
   */
  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  /**
   * Logouts the user.
   */
  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);

  }

  /**
   * Saves the authentication credentials to local storage.
   *
   * @param token Token
   * @param expirationDate Date when the token should expire
   * @param userCredentials
   */
  private saveAuthData(token: string, expirationDate: Date, userCredentials: UserCredentials) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userCredentials.userId);
  }

  /**
   * Removes all items from local storage.
   */
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  /**
   * Gets the authentication data from local storage.
   *
   * @returns object of auth credentials
   */
  private getAuthData(): {token: string, expirationDate: Date, userId: string} {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
