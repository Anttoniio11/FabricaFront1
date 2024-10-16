import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto } from '@shared/dto/login-dto';
import { TokenModel } from '@shared/models/token.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private http = inject(HttpClient);
  private url = 'auth';

  login(data:LoginDto){
    return this.http.post<TokenModel>(`${this.url}/login`, data)
  }

}
