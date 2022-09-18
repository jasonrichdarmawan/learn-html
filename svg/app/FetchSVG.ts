// let svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
// svg.setAttributeNS(null,"height", "16")
// svg.setAttributeNS(null, "width", "16")

// let path = document.createElementNS("http://www.w3.org/2000/svg","path")
// path.setAttributeNS(null, "d", "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z")

// svg.appendChild(path)

// document.getElementsByTagName("Body")[0].appendChild(svg)

// reference: https://unpkg.com/external-svg-loader@1.6.1/svg-loader.js

async function isCacheAvailable(key: string) {
  let value = await get(key)

  if (!value) {
    return;
  }

  let item = JSON.parse(value)

  if (Date.now() > item.expiry) {
    del(key);
    return;
  }

  return item.data
}

function setCache(src: string, data: string) {
  const dataToSet = JSON.stringify({
    data,
    expiry: Date.now() + 60 * 60 * 1000 * 24 * 30
  })
  set(src, dataToSet)
}

function renderBody(elem: SVGSVGElement, body: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");
  const svg = doc.querySelector("svg");
  if (svg == null) {
    throw Error(`Document does not contain svg element`);
  }
  let script = svg.querySelector("script");
  if (script) {
    script.remove();
    console.warn(
      `found <script> from fetching ${elem.getAttribute("data-src")}`
    );
  }
  elem.removeAttribute("data-src");
  Array.from(svg.attributes).forEach((attribute) => {
    elem.setAttribute(attribute.name, attribute.value);
  });
  elem.innerHTML = svg.innerHTML;
}

var requestsInProgress: { [key: string]: boolean } = {};
var memoryCache: { [key: string]: string } = {};

async function renderIcon(elem: SVGSVGElement) {
  let src = elem.getAttribute("data-src");
  if (src == null) {
    throw Error("svg element does not contain data-src attribute");
  }

  const isCache = await isCacheAvailable(src);

  // Memory cache optimizes same icon requested multiple
  // times on the page
  if (memoryCache[src] || isCache) {
    const cache = memoryCache[src] || isCache;
    renderBody(elem, cache);
    return;
  }

  // If the same icon is being requested to rendered
  // avoid firig multiple XHRs
  if (requestsInProgress[src]) {
    setTimeout(() => renderIcon(elem), 20);
    return;
  }
  requestsInProgress[src] = true;

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
      if (src == null) {
        throw Error("let src is null");
      }

      if (!body.startsWith("<svg")) {
        throw Error(`Resource ${src} returned an invaldi SVG file`);
      }

      setCache(src, body)

      memoryCache[src] = body;

      renderBody(elem, body);
    })
    .catch((e) => console.error(e))
    .finally(() => {
      if (src == null) {
        throw Error("let src is null");
      }
      delete requestsInProgress[src]
    });

}

document.querySelectorAll<SVGSVGElement>("svg[data-src]")
.forEach(element => {
    renderIcon(element)
})

// let elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// elem.setAttribute("data-src", "./public/x.svg");
// document.getElementsByTagName("body")[0].appendChild(elem);

// renderIcon(elem);
