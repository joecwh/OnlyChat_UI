export class CustomResponse<T>
{
    IsSuccess : boolean = false;
    Code : string = "";
    Message : string = "";
    Data : T | T[] = [];
}