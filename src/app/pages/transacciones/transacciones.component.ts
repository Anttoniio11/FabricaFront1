import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion-dto';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransaccionModel } from '@shared/models/transaccion-model';
import { TipoTransaccionService } from '@shared/services/tipo-transaccion.service';
import { TransaccionService } from '@shared/services/transaccion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent {

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

  actualizarTransaccion(transaccion:TransaccionModel){
    this.formTransaccion = this.formBuilder.group({
      id: new FormControl(transaccion.id),
      fecha:new FormControl(transaccion.fecha,[Validators.required]),
      monto:new FormControl(transaccion.monto,[Validators.required]),
      motivo:new FormControl(transaccion.motivo,[Validators.required]),
      id_tipo_transaccion:new FormControl(transaccion.id_tipo_transaccion,[Validators.required]),
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

    const {value} = this.formTransaccion;
    console.log(this.formTransaccion.get('id'));

      if (this.formTransaccion.get('id')) {
        const nuevaTransaccion:UpdateTransaccionDTO = value as UpdateTransaccionDTO;
        const saveSub = this.transaccionService.update(nuevaTransaccion)
        .subscribe({
          next:(transaccion)=>{
            let transacciones = [...this.transacciones];
            let transaccion_index = transacciones.findIndex((transaccion)=>transaccion.id==nuevaTransaccion.id);
            transacciones[transaccion_index] = transaccion;
            this.transacciones = transacciones;
            this.cancelarTransaccion();
        },
        complete:()=>{
          saveSub.unsubscribe();
        },
      });
      return;
    }
    const nuevaTransaccion:CreateTransaccionDTO = value as CreateTransaccionDTO;
    const saveSub = this.transaccionService.create(nuevaTransaccion)
    .subscribe({
      next:(transaccion)=>{
        this.transacciones = [...this.transacciones,transaccion]
        this.cancelarTransaccion();
        },
        complete:()=>{
          saveSub.unsubscribe();
        }
    })
  }

  eliminarTransaccion(id:number){
    const deleteSub = this.transaccionService.delete(id)
    .subscribe({
      next:()=>{
        let transacciones = [...this.transacciones];
        let transacciones_index = transacciones.findIndex((transaccion)=>transaccion.id===id);
        transacciones.splice(transacciones_index, 1)
        this.transacciones = transacciones;
      },
      complete:()=>{
        deleteSub.unsubscribe();
      },
    })
  }

}
