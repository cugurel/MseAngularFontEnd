import { ResponseModel } from "./responseModel";

export interface singleResponseModel<T> extends ResponseModel{
    data:T;
}