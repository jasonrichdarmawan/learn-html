document.querySelectorAll<SVGSVGElement>("svg[data-src]")
.forEach(element => {
    renderIcon(element)
})