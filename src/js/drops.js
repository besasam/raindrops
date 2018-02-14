var counter = 0;

function createDrop(x, y) {
  $('#container').append("<div class='drop' id='" + counter + "'></div>");
  $('#' + counter).css({"top": y, "left": x});
  counter += 1;
}

function fall() {
  if($(this).position().top < 599) {
    $(this).css("top", $(this).position().top + 1);
  } else {
    $(this).remove();
  }
}

setInterval(function() {
  var x = Math.random() * 800;
  var y = Math.random() * 50;
  createDrop(x, y);
}, 100);

setInterval(function() {
  var drops = $('.drop');
  drops.each(function() {
    fall.call($(this));
  })
}, 10)
