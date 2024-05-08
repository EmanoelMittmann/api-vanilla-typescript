import { Response } from "@types";

export default function ResBuild(
    res: Response,
    status: number = 200
) {
    res.statusCode = status
    res.write((message: string) => {
        res.end(message)
    })

    res.setHeader("Content-Type", "application/json")
    res.write((message: string) => {
        res.end(JSON.stringify(message))
    })

    return res
}