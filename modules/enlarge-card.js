/**
 * enlarge-card
 * Created by dcorns on 5/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Zoom to svg area containing the card identified by target and position shared I/O components on the card.
 * Load card with prize data provided from the prizeData array and the index provided by target.
 */
'use strict';
const setViewBox = require('./set-view-box');
view.cardSelected = (target, prizeData, view) => {
  const x = target.x.baseVal.value;
  const y = target.y.baseVal.value;
  setViewBox(x, y, 112, 95, 'svgRoot');

  const prizeId = target.id.substr(1);
  document.getElementById(`w${prizeId}`).classList.add('less');
  const prizeIndex = prizeData.findIndex((pd) => pd.viewId === target.id);
  const prize = prizeData[prizeIndex];
  const largeCardHeaderBottom = 30.5;
  const addC1Xoffset = 7, partC1Xoffset = 15, minusC1Xoffset = 44, addC2Xoffset = 66, partC2Xoffset = 74,
    minusC2Xoffset = 103;
  const btnRow1Offset = largeCardHeaderBottom + 1.5;
  positionSVGCircle(view.largeCardClose, x + 105, y + 5);
  positionSVGText(view.largeCardSubTitle, x + 55, y + 24);
  view.largeCardClose.setAttribute('data-PrizeId', prizeId);
  view.largeCardSubTitle.textContent = 'Winning Ticket: ' + prize.tickets.winner;
//First part add btn
  positionSVGCircle(view.btnAdd0, x + addC1Xoffset, y + btnRow1Offset);
  positionSVGText(view.addTxt0, x + addC1Xoffset, y + 34);
  view.addTxt0.textContent = prize.tickets.partList[1];
//First part text
  positionSVGText(view.part1, x + partC1Xoffset, y + 35);
  view.part1.textContent = prize.tickets.partList[0];
//First part remove btn
  positionSVGCircle(view.btnMinus0, x + minusC1Xoffset, y + btnRow1Offset);
  positionSVGCircle(view.btnAdd2, x + addC2Xoffset, y + btnRow1Offset);
  positionSVGText(view.addTxt2, x + addC2Xoffset, y + 34);
  view.addTxt2.textContent = prize.tickets.partList[3];
  positionSVGText(view.part2, x + partC2Xoffset, y + 35);
  view.part2.textContent = prize.tickets.partList[2];
  positionSVGCircle(view.btnMinus2, x + minusC2Xoffset, y + btnRow1Offset);
  positionSVGCircle(view.btnAdd4, x + addC1Xoffset, y + 45);
  positionSVGText(view.addTxt4, x + addC1Xoffset, y + 47);
  view.addTxt4.textContent = prize.tickets.partList[5];
  positionSVGText(view.part3, x + partC1Xoffset, y + 48);
  view.part3.textContent = prize.tickets.partList[4];
  positionSVGCircle(view.btnMinus4, x + minusC1Xoffset, y + 45);
  positionSVGCircle(view.btnAdd6, x + addC2Xoffset, y + 45);
  positionSVGText(view.addTxt6, x + addC2Xoffset, y + 47);
  view.addTxt6.textContent = prize.tickets.partList[7];
  positionSVGText(view.part4, x + partC2Xoffset, y + 48);
  view.part4.textContent = prize.tickets.partList[6];
  positionSVGCircle(view.btnMinus6, x + minusC2Xoffset, y + 45);

  if (prize.tickets.partList[8]) {
    positionSVGCircle(view.btnAdd8, x + addC1Xoffset, y + 58);
    positionSVGText(view.addTxt8, x + addC1Xoffset, y + 60);
    view.addTxt8.textContent = prize.tickets.partList[9];
    positionSVGText(view.part5, x + partC1Xoffset, y + 61);
    view.part5.textContent = prize.tickets.partList[8];
    positionSVGCircle(view.btnMinus8, x + minusC1Xoffset, y + 58);
    if (prize.tickets.partList[10]) {
      positionSVGCircle(view.btnAdd10, x + addC2Xoffset, y + 58);
      positionSVGText(view.addTxt10, x + addC2Xoffset, y + 60);
      view.addTxt10.textContent = prize.tickets.partList[11];
      positionSVGText(view.part6, x + partC2Xoffset, y + 61);
      view.part6.textContent = prize.tickets.partList[10];
      positionSVGCircle(view.btnMinus10, x + minusC2Xoffset, y + 58);
      if (prize.tickets.partList[12]) {
        positionSVGCircle(view.btnAdd12, x + addC1Xoffset, y + 71);
        positionSVGText(view.addTxt12, x + addC1Xoffset, y + 73);
        view.addTxt12.textContent = prize.tickets.partList[13];
        positionSVGText(x + partC1Xoffset, y + 74);
        view.part7.textContent = prize.tickets.partList[12];
        positionSVGCircle(view.btnMinus12, x + minusC1Xoffset, y + 71);
        if (prize.tickets.partList[14]) {
          positionSVGCircle(view.btnAdd14, x + addC2Xoffset, 7 + 71);
          positionSVGText(view.addTxt14, x + addC2Xoffset, y + 73);
          view.addTxt14.textContent = prize.tickets.partList[15];
          positionSVGText(view.part8, x + partC2Xoffset, y + 74);
          view.part8.textContent = prize.tickets.partList[14];
          positionSVGCircle(view.btnMinus14, x + minusC2Xoffset, Y + 71);
        }
      }
    }
  }
};
const positionSVGCircle = (el, x, y,) => {
  el.setAttribute('cx', (x).toString());
  el.setAttribute('cy', (y).toString());
};
const positionSVGText = (el, x, y) => {
  el.setAttribute('x', (x).toString());
  el.setAttribute('y', (y).toString());
};