$(document).ready(function() {

  var boxes = document.getElementById('boxes').getBoundingClientRect();
  var lvltxt = document.getElementById('level').getBoundingClientRect();
  if (boxes.left < lvltxt.right) {
    $('#boxes').css('width', '95%');
    var bw = $('#boxes').width();
    $('#boxes').css('height', bw + 'px');
    $('.num').css('position', 'relative').css('top', '50px').insertAfter('#button');
  }

  end = 1;
  level = 1;
  game = 1;
  ready = 1;
  clrs = generate(level);

  $(button).mousedown(start);
  $('.box').mousedown(box);
});

function start() {
  if (end == 0) {
    game = 1;
    ready = 1;
    end = 1;
    clrs = generate(level);
    $('#lost').text('');
  }

  $(btntxt).text("NEXT");
  $('.btn').css('opacity', '0.5');
  if (ready && game && end) {
    $('#level').text(clrs.length);
    updatescore(clrs.length);
    ready = 0;
    game = 0;
    play(clrs);
    cl_copy = clrs.slice();
    clrs.push(Math.floor(Math.random() * 4));
    setTimeout(function() {
      ready = 1;
    }, 750 * (clrs.length - 1));
  }
}

function box() {
  if (ready && end) {
    $(this).fadeTo(150, 1, function() {
      $(this).fadeTo(150, 0.5);
    });
    click($(this).attr('n'), cl_copy);
    game = check(cl_copy);
  }
}

function click(color, colors) {
  if (color == colors[0]) {
    colors.shift();
  } else {
    $('#lost').text('Lost');
    $(btntxt).text('RESET');
    end = 0;
    updatescore(colors.length - 1);
  }
}

function updatescore(level) {
  if ($('#score').text() < level) {
    $('#score').text(level - 1);
  }
}

function generate(level) {
  var colors = [];
  for (i = 0; i < level; i++) {
    colors.push(Math.floor(Math.random() * 4));
  }
  return colors;
}

function play(colors) {
  for (i = 0; i < colors.length; i++) {
    setTimeout(flash, 750 * i, colors[i]);
  }
}


function flash(color) {
  $('div[n = "' + color + '"]').fadeTo(250, 1, function() {
    $('div[n = "' + color + '"]').fadeTo(250, 0.5);
  });
}

function check(colors) {
  if (colors.length == 0) {
    $('.btn').css('opacity', '1');
    return 1;
  }
}
