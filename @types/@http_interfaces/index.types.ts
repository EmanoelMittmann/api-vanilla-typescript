
export enum Methods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    DELETE = 'DELETE'
}

export interface HeaderDef {
    name: string,
    value: string,
    property: string,
    target: string,
}

export interface MethodDef {
    status: any
    cb: Endpoint,
    middleware?: RouteFunction,
    header: HeaderDef[]
    key: string

}

export type RouteFunction = (...args: any[]) => void;
export type Endpoint = (...args: any[]) => unknown