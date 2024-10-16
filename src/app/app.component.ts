import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{


}
