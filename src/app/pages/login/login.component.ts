import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, inject, OnDestroy } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDto } from '@shared/dto/login-dto';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  private auth_service = inject(AuthService);
  private token_service = inject (TokenService);

  email:string = '';
  password:string = '';

  login_sub:Subscription|null = null;

  ngOnDestroy(): void {
    if (this.login_sub) {
      this.login_sub.unsubscribe();
    }
  }

  login(){
    let data:LoginDto = {
      email:this.email,
      password:this.password,
    }

    this.login_sub = this.auth_service.login(data)
      .subscribe({
        next:(token)=>{
          this.token_service.setToken(token);
        }
      })
  }

}
