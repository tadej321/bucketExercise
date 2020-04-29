import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthDataModel} from './auth-data.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


const BACKEND_URL = environment.backendApiUrl;

interface UserCredentials {
  userId: string;
  name: string;
  surname: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  isAuthenticated = false;
  private userId;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserCredentials() {
    return {
      userId: this.getAuthData().userId,
      name: this.getAuthData().name,
      surname: this.getAuthData().surname,
    };
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const authData: AuthDataModel = {email, password};
    if (BACKEND_URL) {
      this.http.post<{token: string, expiresIn: number, userCredentials: UserCredentials}>(BACKEND_URL + '/login', authData)
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
    } else {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    }
  }

  autoAuthUser() {
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

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);

  }

  private saveAuthData(token: string, expirationDate: Date, userCredentials: UserCredentials) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userCredentials.userId);
    localStorage.setItem('name', userCredentials.name);
    localStorage.setItem('surname', userCredentials.surname);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
  }

  async createUser(userCredentials: AuthDataModel) {
    const authData: AuthDataModel = {
      name: userCredentials.name,
      surname: userCredentials.surname,
      email: userCredentials.email,
      password: userCredentials.password,
    };

    await this.http.post(BACKEND_URL + '/signup', authData).toPromise()
      .then(() => {
        this.router.navigate(['/auth/login']);
      }).catch( error => {
        this.authStatusListener.next(false);
        throw error;
      });
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      name,
      surname
    };
  }
}
