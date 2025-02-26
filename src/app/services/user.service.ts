import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import UserModel from '../models/user/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api

  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/user',
    })
  }

  post (data: UserModel, resource: string = '') {
    // console.log(process.env.VUE_APP_API_URL)

    return this.api.post(resource, data)
  }

  get (resource: string = '') {
    return this.api.get(resource)
  }
}
