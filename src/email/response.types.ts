type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export interface ResponseSuccess {
  code: 0;
  data: Json;
  msg: 'ok';
}

export interface ResponseError {
  code: number;
  msg: string | string[];
  path: string;
}
