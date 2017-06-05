/**
 * enlarge-card
 * Created by dcorns on 5/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Zoom to svg area containing the card identified by target and position shared I/O components from view on the card for each part in partsArray.
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
  if (w / parentSVG.clientWidth > h / parentSVG.clientHeight) {
    parentSVG.setAttribute('height', virtualSpace.y - w / virtualSpace.x * virtualSpace.y);
  }
  else {
    parentSVG.setAttribute('width', (virtualSpace.x - h / virtualSpace.y * virtualSpace.x) - 40);//Why is calculation 40 off
  }
  svg.setViewBox(x, y, w, h, parentSVG.id);

  const largeCardHeaderBottom = 30.5;
  const subTitleTopMargin = 24;
  const closeRadius = view.largeCardClose.r.baseVal.value;

  svg.positionSVGCircle(view.largeCardClose, x + w - closeRadius, y + closeRadius);
  svg.positionSVGText(view.largeCardSubTitle, x + w / 2, y + subTitleTopMargin);
  const largeCardColumns = [
      {
        width: 10, //2 * radius
        marginLeft: 0,
        marginRight:0,
      },
      {
        width: 30, //characters * character set max width(or character width for mono space)
        marginLeft: 0,
        marginRight:0,
      },
      {
        width: 10, //2 * radius
        marginLeft: 0,
        marginRight:6.5,
      },
    ];

  const positionSVG = new svg.Group(largeCardColumns, 2, x + 7, y + largeCardHeaderBottom + 1.5, 14);
  const cardColumnWidth = w / positionSVG.getNumberOfColumns();
  const countAry = partsArray.slice(partsArray.length/2);

  countAry.forEach((item, i) => {
    svg.positionSVGCircle(view[`btnAdd${i}`], positionSVG.nextElementX(), positionSVG.getColumnY());
    svg.positionSVGText(view[`addTxt${i}`], positionSVG.getColumnX(), positionSVG.getColumnY(2.5));
    svg.positionSVGText(view[`part${i}`], positionSVG.nextElementX(), positionSVG.getColumnY(2.5));
    svg.positionSVGCircle(view[`btnMinus${i}`], positionSVG.nextElementX(), positionSVG.getColumnY());
  });
};