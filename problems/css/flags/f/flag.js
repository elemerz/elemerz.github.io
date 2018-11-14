window.onload = function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(100, 0, 200, 100);
  ctx.fillStyle = 'blue';
  ctx.fillRect(200, 0, 300, 100);
  document.body.appendChild(canvas);
};