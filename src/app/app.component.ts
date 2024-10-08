import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { clearAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransaccionModel } from '@shared/models/transaccion-model';
import { TipoTransaccionService } from '@shared/services/tipo-transaccion.service';
import { TransaccionService } from '@shared/services/transaccion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  private formBuilder = inject(FormBuilder);

  private transaccionService = inject(TransaccionService);

  private tipoTransaccionService = inject(TipoTransaccionService);

  formTransaccion:FormGroup|null = null;

  transacciones:TransaccionModel[] = []

  tipoTransacciones:TipoTransaccionModel[] = []


  crear:boolean = false;
  transaccion:TransaccionModel|null = null;
  indexTransaccion:number |null = null;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const dataSub = forkJoin ([
      this.transaccionService.getAll(),
      this.tipoTransaccionService.getAll()
    ]).subscribe({
      next:([transacciones, tipoTransacciones])=>{
        this.transacciones=[...transacciones];
        this.tipoTransacciones=[...tipoTransacciones];
      },
      complete(){
        dataSub.unsubscribe();
      },
    })
  }

  crearTransaccion(){
    this.formTransaccion = this.formBuilder.group({
      fecha:new FormControl(null,[Validators.required]),
      monto:new FormControl(null,[Validators.required]),
      motivo:new FormControl(null,[Validators.required]),
      id_tipo_transaccion:new FormControl(null,[Validators.required]),
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
    const nuevaTransaccion:CreateTransaccionDTO = value as CreateTransaccionDTO;

    const saveSub = this.transaccionService.create(nuevaTransaccion)
    .subscribe({
      next:(transaccion)=>{
        this.transacciones = [...this.transacciones,transaccion];
      },
      complete:()=>{
        saveSub.unsubscribe();
      }
    })

  }

  eliminarTransaccion(index:number){
    let transacciones  = [...this.transacciones];
    transacciones.splice(index,1);
    this.transacciones = [...transacciones];
  }

}
