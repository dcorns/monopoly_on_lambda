/**
 * initialize-large-card-data
 * Created by dcorns on 6/5/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * Set the textContent of view.partN and view.addTxtN to parstAry[even] and partsAry[odd]
 */
'use strict';
module.exports = (view, parts) => {
  let viewIdx = 0;
  parts.partList.forEach((item, i) => {
    if(i%2 === 0){
      view[`part${viewIdx}`].textContent = item;
    }
    else {
      view[`addTxt${viewIdx}`].textContent = item;
      viewIdx++;
    }
  });
  view.largeCardSubTitle.textContent = `Winning Ticket: ${parts.winner}`;
};