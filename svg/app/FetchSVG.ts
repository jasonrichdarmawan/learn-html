// let svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
// svg.setAttributeNS(null,"height", "16")
// svg.setAttributeNS(null, "width", "16")

// let path = document.createElementNS("http://www.w3.org/2000/svg","path")
// path.setAttributeNS(null, "d", "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z")

// svg.appendChild(path)

// document.getElementsByTagName("Body")[0].appendChild(svg)

function renderBody(elem: SVGSVGElement, body: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");
  const svg = doc.querySelector("svg");
  if (svg == null) {
    throw Error(`Document does not contain svg element`);
  }
  let script = svg.querySelector("script")
  if (script) {
    script.remove()
    console.warn("found <script> from fetching")
  }
  Array.from(elem.attributes).forEach((attribute) => {
    elem.removeAttribute(attribute.name);
  });
  Array.from(svg.attributes).forEach((attribute) => {
    elem.setAttribute(attribute.name, attribute.value);
  });
  elem.innerHTML = svg.innerHTML;
}

function renderIcon(el: SVGSVGElement) {
  let src = el.getAttribute("data-src");
  if (src == null) {
    throw Error("svg element does not contain data-src attribute");
  }
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw Error(
          `Request for ${src} returned ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((body) => {
      if (!body.startsWith("<svg")) {
        throw Error(`Resource ${src} returned an invaldi SVG file`);
      }
      renderBody(el, body);
    });
}

// let elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// elem.setAttribute("data-src", "./public/x.svg");
// document.getElementsByTagName("body")[0].appendChild(elem);

// renderIcon(elem);
