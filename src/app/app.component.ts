import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { clearAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TransaccionModel } from '@shared/models/transaccion-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private formBuilder = inject(FormBuilder);
  formTransaccion:FormGroup|null = null;

  transacciones:TransaccionModel[] = [
    // {
    //   monto: 2000,
    //   motivo: "regalo",
    // },
    // {
    //   monto: 3000,
    //   motivo: "deuda",
    // }
  ]

  crear:boolean = false;

  transaccion:TransaccionModel|null = null;
  indexTransaccion:number |null = null;

  crearTransaccion(){
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(0,[Validators.required]),
      motivo:new FormControl('',[Validators.required]),
    });
  }

  actualizarTransaccion(transaccion:TransaccionModel, index:number){
    this.transaccion = transaccion;
    this.indexTransaccion = index;
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(this.transaccion.monto,[Validators.required]),
      motivo:new FormControl(this.transaccion.motivo,[Validators.required]),
    });
  }

  cancelarTransaccion(){
    this.transaccion = null;
    this.indexTransaccion = null;
    this.formTransaccion = null;
  }

  guardarTransaccion(){

    if (!this.formTransaccion || this.formTransaccion.invalid) {
      alert("llena todos los campos");
      return;
    }

    const {value} =this.formTransaccion;
    const nuevaTransaccion:TransaccionModel = value as TransaccionModel;
    if (this.indexTransaccion !== null) {
      let transacciones = [...this.transacciones];
      transacciones[this.indexTransaccion] = nuevaTransaccion;
      this.transacciones = [...transacciones];
      this.formTransaccion = null;
      this.indexTransaccion = null;
      return;
    }
    this.transacciones = [...this.transacciones,nuevaTransaccion];
    this.formTransaccion = null;
  }

  eliminarTransaccion(index:number){
    let transacciones  = [...this.transacciones];
    transacciones.splice(index,1);
    this.transacciones = [...transacciones];
  }

}
