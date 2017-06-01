/**
 * enlarge-card
 * Created by dcorns on 5/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Zoom to svg area containing the card identified by target and position shared I/O components on the card.
 * Load card with prize data provided from the prizeData array and the index provided by target.
 */
'use strict';
const svg = require('./svg-simple');
module.exports = (target, prizeData, view) => {
  const x = target.x.baseVal.value;//target left
  const y = target.y.baseVal.value;//target top
  let w = target.width.baseVal.value;
  let h = target.height.baseVal.value;
  const largeCardHeaderBottom = 30.5;
  const addC1Xoffset = 7, partC1Xoffset = 15, minusC1Xoffset = 44, addC2Xoffset = 66, partC2Xoffset = 74, minusC2Xoffset = 103;
  const btnRow1Offset = largeCardHeaderBottom + 1.5;
  const parentSVG = target.parentElement;
  const virtualSpace = {x: parentSVG.getAttribute('width'), y: parentSVG.getAttribute('height')};
  if (w/parentSVG.clientWidth > h/parentSVG.clientHeight){
    parentSVG.setAttribute('height', virtualSpace.y - w/virtualSpace.x * virtualSpace.y);
  }
  else{
    parentSVG.setAttribute('width', virtualSpace.x - h/virtualSpace.y * virtualSpace.x);
  }
  svg.setViewBox(x, y, w, h, parentSVG.id);
  svg.positionSVGCircle(view.largeCardClose, x + w, y);
  svg.positionSVGText(view.largeCardSubTitle, x + 55, y + 24);
  svg.positionSVGCircle(view.btnAdd0, x + addC1Xoffset, y + btnRow1Offset);
  svg.positionSVGText(view.addTxt0, x + addC1Xoffset, y + 34);
  svg.positionSVGText(view.part1, x + partC1Xoffset, y + 35);
  svg.positionSVGCircle(view.btnMinus0, x + minusC1Xoffset, y + btnRow1Offset);
  svg.positionSVGCircle(view.btnAdd2, x + addC2Xoffset, y + btnRow1Offset);
  svg.positionSVGText(view.addTxt2, x + addC2Xoffset, y + 34);
  svg.positionSVGText(view.part2, x + partC2Xoffset, y + 35);
  svg.positionSVGCircle(view.btnMinus2, x + minusC2Xoffset, y + btnRow1Offset);
  svg.positionSVGCircle(view.btnAdd4, x + addC1Xoffset, y + 45);
  svg.positionSVGText(view.addTxt4, x + addC1Xoffset, y + 47);
  svg.positionSVGText(view.part3, x + partC1Xoffset, y + 48);
  svg.positionSVGCircle(view.btnMinus4, x + minusC1Xoffset, y + 45);
  svg.positionSVGCircle(view.btnAdd6, x + addC2Xoffset, y + 45);
  svg.positionSVGText(view.addTxt6, x + addC2Xoffset, y + 47);
  svg.positionSVGText(view.part4, x + partC2Xoffset, y + 48);
  svg.positionSVGCircle(view.btnMinus6, x + minusC2Xoffset, y + 45);

  const prizeId = target.id.substr(1);
  document.getElementById(`w${prizeId}`).classList.add('less');
  const prizeIndex = prizeData.findIndex((pd) => pd.viewId === target.id);
  const prize = prizeData[prizeIndex];
  view.largeCardClose.setAttribute('data-PrizeId', prizeId);
  view.largeCardSubTitle.textContent = 'Winning Ticket: ' + prize.tickets.winner;
  view.addTxt0.textContent = prize.tickets.partList[1];
  view.part1.textContent = prize.tickets.partList[0];
  view.addTxt2.textContent = prize.tickets.partList[3];
  view.part2.textContent = prize.tickets.partList[2];
  view.addTxt4.textContent = prize.tickets.partList[5];
  view.part3.textContent = prize.tickets.partList[4];
  view.addTxt6.textContent = prize.tickets.partList[7];
  view.part4.textContent = prize.tickets.partList[6];

  if (prize.tickets.partList[8]) {
    svg.positionSVGCircle(view.btnAdd8, x + addC1Xoffset, y + 58);
    svg.positionSVGText(view.addTxt8, x + addC1Xoffset, y + 60);
    svg.positionSVGText(view.part5, x + partC1Xoffset, y + 61);
    svg.positionSVGCircle(view.btnMinus8, x + minusC1Xoffset, y + 58);
    view.addTxt8.textContent = prize.tickets.partList[9];
    view.part5.textContent = prize.tickets.partList[8];
    if (prize.tickets.partList[10]) {
      svg.positionSVGCircle(view.btnAdd10, x + addC2Xoffset, y + 58);
      svg.positionSVGText(view.addTxt10, x + addC2Xoffset, y + 60);
      svg.positionSVGText(view.part6, x + partC2Xoffset, y + 61);
      svg.positionSVGCircle(view.btnMinus10, x + minusC2Xoffset, y + 58);
      view.addTxt10.textContent = prize.tickets.partList[11];
      view.part6.textContent = prize.tickets.partList[10];
      if (prize.tickets.partList[12]) {
        svg.positionSVGCircle(view.btnAdd12, x + addC1Xoffset, y + 71);
        svg.positionSVGText(view.addTxt12, x + addC1Xoffset, y + 73);
        svg.positionSVGText(view.part7, x + partC1Xoffset, y + 74);
        svg.positionSVGCircle(view.btnMinus12, x + minusC1Xoffset, y + 71);
        view.addTxt12.textContent = prize.tickets.partList[13];
        view.part7.textContent = prize.tickets.partList[12];
        if (prize.tickets.partList[14]) {
          svg.positionSVGCircle(view.btnAdd14, x + addC2Xoffset, y + 71);
          svg.positionSVGText(view.addTxt14, x + addC2Xoffset, y + 73);
          svg.positionSVGText(view.part8, x + partC2Xoffset, y + 74);
          svg.positionSVGCircle(view.btnMinus14, x + minusC2Xoffset, y + 71);
          view.addTxt14.textContent = prize.tickets.partList[15];
          view.part8.textContent = prize.tickets.partList[14];
        }
      }
    }
  }
};