/**
 * set-view-box
 * Created by dcorns on 5/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Set the position, height and width of svg viewBox attribute
 */
'use strict';
module.exports = (x, y, h, w, elId) => {
  const el = document.getElementById(elId);
  el.setAttribute('viewBox', `${x} ${y} ${h} ${w}`);
};