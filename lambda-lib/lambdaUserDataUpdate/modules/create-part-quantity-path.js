/**
 * create-part-quantity-path
 * Created by dcorns on 5/12/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const partsAry = 'tickets/partList';
module.exports = (guid, prizeIdx, partQuantityIdx) => {
  return `${guid}/${prizeIdx}/${partsAry}/${partQuantityIdx}`
};