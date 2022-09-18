function myDisplayer(some: number) {
    let doc = document.getElementsByTagName("body")[0]
    if (doc == null) {
        throw Error("body tag is not found")
    }
    doc.innerHTML = some.toString();
}

function myCalculator(num1: number, num2: number, myCallback: (some:number) => void) {
    let sum = num1 + num2;
    myCallback(sum)
}

myCalculator(5,5,myDisplayer)
myCalculator(5,5,(some: number) => console.log(some))