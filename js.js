$(document).ready(function() {
  end = 1;
  var level = 1;
  var game = 1;
  var ready = 1;
  clrs = generate(level);
  $(button).click(function() {
    $('span').text("Next");
    $('.btn').css('opacity', '0.5');
    if (ready && game && end) {
      ready = 0;
      game = 0;
      play(clrs);
      cl_copy = clrs.slice();
      clrs.push(Math.floor(Math.random() * 4));
      setTimeout(function() {
        ready = 1;
      }, 750 * clrs.length);
    }
  });
  $('.box').click(function() {
    if (ready && end) {
      $(this).fadeTo(50, 1, function() {
        $(this).fadeTo(50, 0.5);
      });
      click($(this).attr('n'), cl_copy);
      game = check(cl_copy);
    }
  });
});

function click(color, colors) {
  if (color == colors[0]) {
    colors.shift();
  } else {
    $('h1').text('Lost');
    end = 0;
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
    setTimeout(flash, 1000 * i, colors[i]);
  }
}


function flash(color) {
  setTimeout(function() {
    $('.box').css('opacity', '0.5');
  }, 500);
  $('div[n = "' + color + '"]').css('opacity', '1');
}

function check(colors) {
  if (colors.length == 0) {
    $('.btn').css('opacity', '1');
    return 1;
  }
}
