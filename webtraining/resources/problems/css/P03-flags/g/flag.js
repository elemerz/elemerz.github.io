window.onload = function () {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    appendRect = function(svgParam, x, y, w, h, color){
      var rect = document.createElementNS(svgNS,'rect');

      rect.setAttribute('x',x);
      rect.setAttribute('y',y);
      rect.setAttribute('width',w);
      rect.setAttribute('height',h);
      rect.setAttribute('fill',color);

      svgParam.appendChild(rect);
    };

  appendRect(svg,0,0,100,100,'red');
  appendRect(svg,100,0,100,100,'yellow');
  appendRect(svg,200,0,100,100,'blue');
  document.body.appendChild(svg);
};