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
module.exports = (target, partsArray, view) => {

  const x = target.x.baseVal.value;//target left
  const y = target.y.baseVal.value;//target top
  let w = target.width.baseVal.value;
  let h = target.height.baseVal.value;
  const parentSVG = target.parentElement;
  const virtualSpace = {x: parentSVG.getAttribute('width'), y: parentSVG.getAttribute('height')};
  if (w/parentSVG.clientWidth > h/parentSVG.clientHeight){
    parentSVG.setAttribute('height', virtualSpace.y - w/virtualSpace.x * virtualSpace.y);
  }
  else{
    parentSVG.setAttribute('width', (virtualSpace.x - h/virtualSpace.y * virtualSpace.x) - 40);//Why is calculation 40 off
  }
  svg.setViewBox(x, y, w, h, parentSVG.id);

  const largeCardHeaderBottom = 30.5;
  const subTitleTopMargin = 24;
  const closeRadius = view.largeCardClose.r.baseVal.value;

  svg.positionSVGCircle(view.largeCardClose, x + w - closeRadius, y + closeRadius);
  svg.positionSVGText(view.largeCardSubTitle, x + w/2 , y + subTitleTopMargin);

  const numberOfColumns = 2;
  const leftColumnMargin = 7;
  const columnInnerSpacing = 2;
  const columnWidth = w/numberOfColumns;
  const column1Start = x + leftColumnMargin, partC1Xoffset = 15, minusC1Xoffset = 44, addC2Xoffset = 66, partC2Xoffset = 74, minusC2Xoffset = 103;
  const btnRow1Offset = largeCardHeaderBottom + 1.5;

  svg.positionSVGCircle(view.btnAdd0, column1Start, y + btnRow1Offset);
  svg.positionSVGText(view.addTxt0, column1Start, y + 34);
  svg.positionSVGText(view.part1, x + partC1Xoffset, y + 35);
  svg.positionSVGCircle(view.btnMinus0, x + minusC1Xoffset, y + btnRow1Offset);
  svg.positionSVGCircle(view.btnAdd2, x + addC2Xoffset, y + btnRow1Offset);
  svg.positionSVGText(view.addTxt2, x + addC2Xoffset, y + 34);
  svg.positionSVGText(view.part2, x + partC2Xoffset, y + 35);
  svg.positionSVGCircle(view.btnMinus2, x + minusC2Xoffset, y + btnRow1Offset);
  svg.positionSVGCircle(view.btnAdd4, column1Start, y + 45);
  svg.positionSVGText(view.addTxt4, column1Start, y + 47);
  svg.positionSVGText(view.part3, x + partC1Xoffset, y + 48);
  svg.positionSVGCircle(view.btnMinus4, x + minusC1Xoffset, y + 45);
  svg.positionSVGCircle(view.btnAdd6, x + addC2Xoffset, y + 45);
  svg.positionSVGText(view.addTxt6, x + addC2Xoffset, y + 47);
  svg.positionSVGText(view.part4, x + partC2Xoffset, y + 48);
  svg.positionSVGCircle(view.btnMinus6, x + minusC2Xoffset, y + 45);

  view.addTxt0.textContent = partsArray[1];
  view.part1.textContent = partsArray[0];
  view.addTxt2.textContent = partsArray[3];
  view.part2.textContent = partsArray[2];
  view.addTxt4.textContent = partsArray[5];
  view.part3.textContent = partsArray[4];
  view.addTxt6.textContent = partsArray[7];
  view.part4.textContent = partsArray[6];
  if (partsArray[8]) {
    svg.positionSVGCircle(view.btnAdd8, column1Start, y + 58);
    svg.positionSVGText(view.addTxt8, column1Start, y + 60);
    svg.positionSVGText(view.part5, x + partC1Xoffset, y + 61);
    svg.positionSVGCircle(view.btnMinus8, x + minusC1Xoffset, y + 58);
    view.addTxt8.textContent = partsArray[9];
    view.part5.textContent = partsArray[8];
    if (partsArray[10]) {
      svg.positionSVGCircle(view.btnAdd10, x + addC2Xoffset, y + 58);
      svg.positionSVGText(view.addTxt10, x + addC2Xoffset, y + 60);
      svg.positionSVGText(view.part6, x + partC2Xoffset, y + 61);
      svg.positionSVGCircle(view.btnMinus10, x + minusC2Xoffset, y + 58);
      view.addTxt10.textContent = partsArray[11];
      view.part6.textContent = partsArray[10];
      if (partsArray[12]) {
        svg.positionSVGCircle(view.btnAdd12, column1Start, y + 71);
        svg.positionSVGText(view.addTxt12, column1Start, y + 73);
        svg.positionSVGText(view.part7, x + partC1Xoffset, y + 74);
        svg.positionSVGCircle(view.btnMinus12, x + minusC1Xoffset, y + 71);
        view.addTxt12.textContent = partsArray[13];
        view.part7.textContent = partsArray[12];
        if (partsArray[14]) {
          svg.positionSVGCircle(view.btnAdd14, x + addC2Xoffset, y + 71);
          svg.positionSVGText(view.addTxt14, x + addC2Xoffset, y + 73);
          svg.positionSVGText(view.part8, x + partC2Xoffset, y + 74);
          svg.positionSVGCircle(view.btnMinus14, x + minusC2Xoffset, y + 71);
          view.addTxt14.textContent = partsArray[15];
          view.part8.textContent = partsArray[14];
        }
      }
    }
  }
};