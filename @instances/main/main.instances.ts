import ResBuild from '@instances/response/index.presenter'
import { IRouter, MethodDef, Methods, Request, Response, RouteFunction } from '@types'
import http from 'node:http'
import { parse } from 'src/utils'

export class Main {
    private static instance: Main
    private readonly _routeMapper: Record<string, Record<Methods, MethodDef>> = {}
    private readonly _middleware: Array<RouteFunction> = []

    constructor(){
    }

    public static getInstance(): Main {
        if(!Main.instance){
            this.instance = new Main()
        }

        return Main.instance
    }

    public registerRoutes(
        path: string,
        endpoint: MethodDef,
        method: Methods
    ): void {
        if(!this._routeMapper[path]){
            this._routeMapper[path] = {} as Record<Methods, MethodDef>
        }
        this._routeMapper[path]
    }

    public startApplication(): void {
        http.createServer(async (req: Request, res: Response) => {
            
            const overrideReq: Request = <Request>req
            const routes = Object.keys(this._routeMapper);
            let match = false;
            let routeMatch = "";
            for(let i = 0; i < routes.length; i++){
                const parsedRoute = parse(routes[i])
                if(
                    new RegExp(parsedRoute).test(overrideReq.url as string) && 
                    this._routeMapper[routes[i]][overrideReq.method as Methods] &&
                    overrideReq.url === routes[i]
                ){
                    routeMatch = routes[i]
                    match = true
                }
                if(
                    !routeMatch && 
                    new RegExp(parsedRoute).test(overrideReq.url as string) && 
                    this._routeMapper[routes[i]][overrideReq.method as Methods]
                ){
                    routeMatch = routes[i]
                    match = true
                }
            }

            if(match){
                const currentEndpointData: MethodDef = this._routeMapper[routeMatch][req.method]
                const matches = overrideReq.url.match(
                    new RegExp(parse(routeMatch))
                )

                overrideReq.params = matches.groups as Record<string, any>
                overrideReq.body = JSON.parse("[]")
                const overrideRes = ResBuild(
                    <Response>res,
                    currentEndpointData.status
                )
                if(currentEndpointData.header){
                    currentEndpointData.header.forEach((header) => {
                        res.setHeader(header.name, header.value)
                    })
                }
            } else {
                res.statusCode = 404;
                res.end()
            }

        }).listen(process.env.PORT,() => {
            console.log('[APP] : Application is running in port ' + process.env.PORT);
        })
    }
}