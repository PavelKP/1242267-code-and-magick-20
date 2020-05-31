'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var GAP_LEFT_STATS = 55;

var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;
var BAR_MARGIN_TOP = 90;

var MESSAGE_FONT_SIZE = 16;
var FONT_STYLE = 'PT Mono';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMessage = function (ctx, line1, line2) {
  ctx.font = MESSAGE_FONT_SIZE + 'px ' + FONT_STYLE;
  ctx.fillText(line1, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText(line2, CLOUD_X + GAP * 2, CLOUD_Y + MESSAGE_FONT_SIZE + GAP * 3);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  renderMessage(ctx, 'Ура Вы победили!', 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    var barHeightCustom = (MAX_BAR_HEIGHT * times[i] / maxTime);
    var saturation = Math.floor((Math.random() * (100 + 1)));

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + saturation + '% , 50%)';
    }

    // Render bars
    ctx.fillRect(CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + BAR_MARGIN_TOP + (MAX_BAR_HEIGHT - barHeightCustom), BAR_WIDTH, barHeightCustom);

    ctx.fillStyle = '#000';
    // Render points
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + BAR_MARGIN_TOP + MAX_BAR_HEIGHT - barHeightCustom - GAP);
    // Render names
    ctx.fillText(players[i], CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT);
  }
};
