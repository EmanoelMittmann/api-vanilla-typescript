import { IncomingMessage, ServerResponse } from "http"

export interface Request extends IncomingMessage {
    params: Record<string, any>
    body: Record<string, any>
}
export type Response = ServerResponse

