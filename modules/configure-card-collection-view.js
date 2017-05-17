/**
 * configure-card-collection-view
 * Created by dcorns on 5/17/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 * to replace configurUI
 */
'use strict';
const checkForRareTicket = require('./check-for-one-zero');
/**
 * Set the content for all the prize nodes with the data provided by the array of prize objects
 * @param {Object[]} ary - Array of prize objects
 */
module.exports = (ary) => {
  ary.forEach((item) => {
    setWinningTicket(item);
    setPrizeTitle(item);
  });
};
/**
 * If a single ticket is left to win a prize set textContent for winning ticket in the prize DOM node to the ticket id.
 * @param {Object} prize
 * @param {string} prize.viewId - The id of the top level svg that makes up the given prizes DOM node
 */
const setWinningTicket = (prize) => {
  const ticket = checkForRareTicket(prize.tickets.partList);
  if (ticket) {
    document.getElementById(`w${prize.viewId.substr(1)}`).textContent = ticket;
  }
};
/**
 * Set title text of SVG to match the name field of the given prize object
 * @param {Object} prize - Object containing all prize data for a single prize
 * @param {string} prize.name - Title of prize
 * @param {string} prize.viewId - The id of the top level svg that makes up the given prizes DOM node
 */
const setPrizeTitle = (prize) => {
  document.getElementById(`t${prize.viewId.substr(1)}`).textContent = prize.name;
};