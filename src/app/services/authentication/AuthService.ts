import axios, {AxiosInstance} from 'axios';
import UserModel from '../../models/user/UserModel';
import {Injectable} from '@angular/core';
import {environment} from '../../../enviroments/enviroment';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private api
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  constructor() {
    this.api = axios.create({
      // This will be changed later to a new class in the rest api that handles the auth endpoints
      baseURL: environment.apiUrl + '/user',
      withCredentials: true
    })

    this.api.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.respose?.status === 401) {
          try {
            await this.refreshToken()
            return this.api.request(error.config);
          } catch (err) {
            console.error(err);
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    )
  }

  async checkAuthStatus():Promise<boolean> {
    try {
      const res  = await this.api.get('/status')
      this.authStatus.next(res.data);
      return res.data;
    } catch (e) {
      console.error('Error checking auth status:', e);
      this.authStatus.next(false);
      return false
    }

    // await this.api.get('/status')
    //   .pipe(
    //     tap(response => {this.authStatus$.next(response)})
    //   )
    //   .subscribe();
  }

  async login (email: string, password: string) {
    return await this.api.post('/login', {email, password});
  }

  async refreshToken() {
    return await this.api.post('/refresh_token');
  }

  async logout() {
    await this.api.post('/logout');
    this.authStatus.next(false);
  }
}
