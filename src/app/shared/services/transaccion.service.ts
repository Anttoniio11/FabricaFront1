import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion-dto';
import { TransaccionModel } from '@shared/models/transaccion-model';

@Injectable({
  providedIn: 'root'
})

export class TransaccionService {

  private http = inject(HttpClient);

  url:string = `transacciones`

  constructor() { }

  getAll(){
    return this.http.get<TransaccionModel[]>(this.url)
  }

  create(data:CreateTransaccionDTO){
    return this.http.post<TransaccionModel>(this.url, data);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  update(data: UpdateTransaccionDTO) {
    const {id} = data;
    return this.http.put<TransaccionModel>(`${this.url}/${id}`, data);
  }

}
