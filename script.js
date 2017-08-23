$(document).ready(function() {
  var boxes = document.getElementById('boxes').getBoundingClientRect();
  var lvltxt = document.getElementById('level').getBoundingClientRect();
  if (boxes.left < lvltxt.right) {
    $('#level').css('position', 'relative').insertAfter('#button');
    $('#highscore').css('position', 'relative').css('top', '20px').insertAfter('#button');
  }
  end = 1;
  var level = 1;
  var game = 1;
  var ready = 1;
  clrs = generate(level);
  $(button).click(function() {
    if (end == 0) {
      game = 1;
      ready = 1;
      end = 1;
      clrs = generate(level);
      $('h1').text('');
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
      }, 1000 * (clrs.length - 1));
    }
  });
  $('.box').click(function() {
    if (ready && end) {
      $(this).fadeTo(150, 1, function() {
        $(this).fadeTo(150, 0.5);
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
    setTimeout(flash, 1000 * i, colors[i]);
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
