/**
 * svg-simple
 * Created by dcorns on 5/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Some svg abstractions
 */
'use strict';
module.exports = {
  setViewBox: (x, y, h, w, elId) => {
  const el = document.getElementById(elId);
  el.setAttribute('viewBox', `${x} ${y} ${h} ${w}`);},
  positionSVGCircle : (el, x, y) => {
    el.setAttribute('cx', (x).toString());
    el.setAttribute('cy', (y).toString());
  },
  positionSVGText : (el, x, y) => {
    el.setAttribute('x', (x).toString());
    el.setAttribute('y', (y).toString());
  },
  Group: function ColumnSettings (elements, numberOfColumns = 2, columnStart = 0, rowStart = 0, rowStep = 20) {
    let _columnX = columnStart + elements[0].marginLeft;
    let _elementIdx = -1;
    let _columnCount = 0;
    let _columnY = rowStart;
    this.getTotalColumnWidth = () => elements.reduce((accumulator, ce) => {
      return accumulator + ce.width + ce.marginLeft + ce.marginRight;
    }, 0) * numberOfColumns;
    this.nextElementX = () => {
      _elementIdx++;
      if(!(_elementIdx === 0)) {//Not first time called
        if (_elementIdx === elements.length) {
          _columnCount++;
          if (_columnCount === numberOfColumns) {
            _columnX = columnStart + elements[0].marginLeft;
            _columnCount = 0;
            _columnY += rowStep;
          }
          else {
            _columnX = _columnX + elements[0].width / 2 + elements[_elementIdx - 1].width / 2 + elements[_elementIdx - 1].marginRight + elements[0].marginLeft;
          }
          _elementIdx = 0;
        }
        else {
          _columnX = _columnX + elements[_elementIdx - 1].width / 2 + elements[_elementIdx].width / 2 + elements[_elementIdx - 1].marginRight + elements[_elementIdx].marginLeft;
        }
      }
      return _columnX;
    };
    this.getNumberOfColumns = () => numberOfColumns;
    this.getColumnStart = () => columnStart;
    this.getColumnX = () => _columnX;
    this.getColumnY = (add = 0) => _columnY + add;
  }
};