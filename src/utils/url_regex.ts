export function parse(url: string): string {
    let str = "^";

    for(let i = 0; i < url.length; i++){
        const c = url.charAt(i)
        if(c === ":"){
            let j: number
            let param = ""
            for(j = i + 1; j < url.length; j++){
                if(/\w/.test(url.charAt(j))){
                    param += url.charAt(j)
                } else {
                    break
                }
            }
            str += `(?<${param}>\\w+)`
            i = j
        } else {
            str += c;
        }
    }
    str += "$"
    return str
}