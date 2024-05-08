import {IncomingMessage,ServerResponse} from 'node:http'


export interface IRouter {
    router: (req: IncomingMessage, res: ServerResponse) => any
}