import { TransaccionModel } from "./transaccion-model";

export interface TipoTransaccionModel {
  id:number;
  tipo_transaccion:string;
  transacciones?:TransaccionModel[];
}
