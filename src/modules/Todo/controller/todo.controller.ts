import { Request,Response } from "@types";

export class TodoController  {
    constructor(private req: Request, private res: Response){}  

    private readonly method = this.req.method    


}