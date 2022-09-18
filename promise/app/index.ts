import { add } from "./add.js"

let total = await add(1,1).then((result) => add(result,1)).then((result) => add(result, 1))

if (total != 4) {
    throw Error("var total is not equal to 4")
}

console.log(total)