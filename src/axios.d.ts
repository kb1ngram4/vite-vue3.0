// 类型“AxiosResponse<any, any>”上不存在属性“code”。
export type ApiResponse<T> = {
    code:number,
    data:T,
    msg:string
}