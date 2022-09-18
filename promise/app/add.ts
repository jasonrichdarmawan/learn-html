export function add(x: number, y: number): Promise<number> {
    return new Promise((resolve, reject) => {
        resolve(x + y)
    })
}