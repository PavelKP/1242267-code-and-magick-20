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

// Render square block
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Render top message consisting of two lines
var renderMessage = function (ctx, line1, line2) {
  ctx.font = MESSAGE_FONT_SIZE + 'px ' + FONT_STYLE;
  ctx.fillText(line1, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText(line2, CLOUD_X + GAP * 2, CLOUD_Y + MESSAGE_FONT_SIZE + GAP * 3);
};

// Render one bar with name and times
var renderGraph = function (ctx, playerTime, playerName, number, maxTime) {
  // Calculate bar height depending on times
  var barHeightCustom = (MAX_BAR_HEIGHT * playerTime / maxTime);
  // Render bar
  ctx.fillRect(CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * number, CLOUD_Y + BAR_MARGIN_TOP + (MAX_BAR_HEIGHT - barHeightCustom), BAR_WIDTH, barHeightCustom);
  // Define fill color
  ctx.fillStyle = '#000';
  // Render times
  ctx.fillText(Math.round(playerTime), CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * number, CLOUD_Y + BAR_MARGIN_TOP + MAX_BAR_HEIGHT - barHeightCustom - GAP);
  // Render name
  ctx.fillText(playerName, CLOUD_X + GAP_LEFT_STATS + (BAR_WIDTH + BAR_GAP) * number, CLOUD_HEIGHT);
};

// Get a maximum value from times array
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
  // render basic cloud
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  // render shadow
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  renderMessage(ctx, 'Ура Вы победили!', 'Список результатов:');

  var maxTime = getMaxElement(times);

  // render the whole graph in cycle (all bars, names, times)
  for (var i = 0; i < players.length; i++) {

    // Get random saturation value (from 0 to 100)
    var saturation = Math.floor((Math.random() * (100 + 1)));

    if (players[i] === 'Вы') {
      // set red fill for 'Вы' player bar
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // set random color for other player bars
      ctx.fillStyle = 'hsl(240, ' + saturation + '% , 50%)';
    }
    // render single bar, player name and player times
    renderGraph(ctx, times[i], players[i], i, maxTime);
  }
};
