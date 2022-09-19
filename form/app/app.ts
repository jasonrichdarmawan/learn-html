let files = <HTMLInputElement> document.querySelector("input[type='file'][name='files']")
if (files == null) {
    throw Error("input type='file' name='files' element is not found")
}
files.addEventListener("change", (e) => {
    const fileList = (<HTMLInputElement> e.target).files
    if (fileList == null) {
        throw Error("FileList object is null")
    }
    console.log(fileList)
})