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
};