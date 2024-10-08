import { TipoTransaccionModel } from "./tipo-transaccion-model";

export interface TransaccionModel {
  id:number;
  fecha:Date;
  monto:number;
  motivo:string;
  id_tipo_transaccion:number;
  tipo_transaccion?:TipoTransaccionModel;
}
