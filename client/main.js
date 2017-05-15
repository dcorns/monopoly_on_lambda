/**
 * main
 * Created by dcorns on 2/27/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
const grids = require('../modules/drc-grids');
const view = {};//view will be responsible for all view state changes and elements
let loggedIn = false;
let hasToken = false;
let currentPrize;
let currentIndex;
const acquireView = (view) => {
  view.largeCardClose = document.getElementById("goBack");
  view.svgRoot = document.getElementById("prizes");//root svg element
  view.largeCardSubTitle = document.getElementById("winnerTxt");
  view.btnAdd0 = document.getElementById("add0");
  view.btnAdd2 = document.getElementById("add2");
  view.btnAdd4 = document.getElementById("add4");
  view.btnAdd6 = document.getElementById("add6");
  view.btnAdd8 = document.getElementById("add8");
  view.btnAdd10 = document.getElementById("add10");
  view.btnAdd12 = document.getElementById("add12");
  view.btnAdd14 = document.getElementById("add14");
  view.minus0 = document.getElementById("minus0");
  view.minus2 = document.getElementById("minus2");
  view.minus4 = document.getElementById("minus4");
  view.minus6 = document.getElementById("minus6");
  view.minus8 = document.getElementById("minus8");
  view.minus10 = document.getElementById("minus10");
  view.minus12 = document.getElementById("minus12");
  view.minus14 = document.getElementById("minus14");
  view.part1 = document.getElementById("part1");
  view.part2 = document.getElementById("part2");
  view.part3 = document.getElementById("part3");
  view.part4 = document.getElementById("part4");
  view.part5 = document.getElementById("part5");
  view.part6 = document.getElementById("part6");
  view.part7 = document.getElementById("part7");
  view.part8 = document.getElementById("part8");
  view.addTxt0 = document.getElementById("addTxt0");
  view.addTxt2 = document.getElementById("addTxt2");
  view.addTxt4 = document.getElementById("addTxt4");
  view.addTxt6 = document.getElementById("addTxt6");
  view.addTxt8 = document.getElementById("addTxt8");
  view.addTxt10 = document.getElementById("addTxt10");
  view.addTxt12 = document.getElementById("addTxt12");
  view.addTxt14 = document.getElementById("addTxt14");
};
//Store will be responsible for all data state

let prizeData = [];
const store = {
  current:{
    prizeIndex:0,
    partQuantityIndex:1,
    partQuantityValue:0,
    prize: false
  }
};
const loginResource = 'https://pjpk6esqw5.execute-api.us-west-2.amazonaws.com/prod/monoplylogin';
const remoteDataUrl = 'https://monopoly-d9e3c.firebaseio.com/bob.json';
const authorizationResource = 'https://pjpk6esqw5.execute-api.us-west-2.amazonaws.com/prod/monopolyauthorization';
const userDataResource = 'https://pjpk6esqw5.execute-api.us-west-2.amazonaws.com/prod/userdata';
const updateUserDataResource = 'https://pjpk6esqw5.execute-api.us-west-2.amazonaws.com/prod/userdataupdate';
view.current = {prize: false};
const defineViewFunctions = (view) => {
  view.setCurrent = (prop, val) => {
    view.current[prop] = val;
  };
  view.positionViewBox = (x, y, elId) => {
    let el = document.getElementById(elId);
    //let test = el.getAttribute('viewBox');
    let w = el.width.baseVal.value;
    let allofit = el.viewBox.baseVal;
    el.setAttribute('viewBox', `${x} ${y} 112 95`);
  };
  view.setWinningTicketOnPrizeCard = (prize) => {
    const winningTicket = checkForRareTicket(prize);
    if (winningTicket) {
      document.getElementById(`w${prize.viewId.substr(1)}`).textContent = winningTicket;
    }
    else {
      document.getElementById(`w${prize.viewId.substr(1)}`).textContent = 'Winner Unknown';
    }
  };
  view.cardSelected = (target) => {
    const x = target.x.baseVal.value;
    const y = target.y.baseVal.value;
    view.positionViewBox(x,y,'prizes');

    const prizeId = target.id.substr(1);
    document.getElementById(`w${prizeId}`).classList.add('less');
    const prizeIdx = prizeData.findIndex((pd) => pd.viewId === target.id);
    currentPrize = store.setCurrentPrize(prizeData[prizeIdx]);
    currentIndex = prizeIdx;
    store.current.prizeIndex = prizeIdx;
    store.current.prize = store.setCurrentPrize(prizeData[store.current.prizeIndex]);
    const largeCardHeaderBottom = 30.5;
    const addC1Xoffset = 7, partC1Xoffset = 15, minusC1Xoffset = 44, addC2Xoffset = 66, partC2Xoffset = 74,
      minusC2Xoffset = 103;
    const btnRow1Offset = largeCardHeaderBottom + 1.5;

    view.largeCardClose.setAttribute('cx', (x + 105).toString());
    view.largeCardClose.setAttribute('cy', (y + 5).toString());
    view.largeCardClose.setAttribute('data-PrizeId', prizeId);
    view.largeCardSubTitle.setAttribute('x', (x + 55).toString());
    view.largeCardSubTitle.setAttribute('y', (y + 24).toString());
    view.largeCardSubTitle.textContent = 'Winning Ticket: ' + prizeData[prizeIdx].tickets.winner;

    view.btnAdd0.setAttribute('cx', (x + addC1Xoffset).toString());
    view.btnAdd0.setAttribute('cy', (y + btnRow1Offset).toString());
    view.addTxt0.setAttribute('x', (x + addC1Xoffset).toString());
    view.addTxt0.setAttribute('y', (y + 34).toString());
    view.addTxt0.textContent = prizeData[prizeIdx].tickets.partList[1];
    view.part1.setAttribute('x', (x + partC1Xoffset).toString());
    view.part1.setAttribute('y', (y + 35).toString());
    view.part1.textContent = prizeData[prizeIdx].tickets.partList[0];
    view.minus0.setAttribute('cx', (x + minusC1Xoffset).toString());
    view.minus0.setAttribute('cy', (y + btnRow1Offset).toString());

    view.btnAdd2.setAttribute('cx', (x + addC2Xoffset).toString());
    view.btnAdd2.setAttribute('cy', (y + btnRow1Offset).toString());
    view.addTxt2.setAttribute('x', (x + addC2Xoffset).toString());
    view.addTxt2.setAttribute('y', (y + 34).toString());
    view.addTxt2.textContent = prizeData[prizeIdx].tickets.partList[3];
    view.part2.setAttribute('x', (x + partC2Xoffset).toString());
    view.part2.setAttribute('y', (y + 35).toString());
    view.part2.textContent = prizeData[prizeIdx].tickets.partList[2];
    view.minus2.setAttribute('cx', (x + minusC2Xoffset).toString());
    view.minus2.setAttribute('cy', (y + btnRow1Offset).toString());

    view.btnAdd4.setAttribute('cx', (x + addC1Xoffset).toString());
    view.btnAdd4.setAttribute('cy', (y + 45).toString());
    view.addTxt4.setAttribute('x', (x + addC1Xoffset).toString());
    view.addTxt4.setAttribute('y', (y + 47).toString());
    view.addTxt4.textContent = prizeData[prizeIdx].tickets.partList[5];
    view.part3.setAttribute('x', (x + partC1Xoffset).toString());
    view.part3.setAttribute('y', (y + 48).toString());
    view.part3.textContent = prizeData[prizeIdx].tickets.partList[4];
    view.minus4.setAttribute('cx', (x + minusC1Xoffset).toString());
    view.minus4.setAttribute('cy', (y + 45).toString());

    view.btnAdd6.setAttribute('cx', (x + addC2Xoffset).toString());
    view.btnAdd6.setAttribute('cy', (y + 45).toString());
    view.addTxt6.setAttribute('x', (x + addC2Xoffset).toString());
    view.addTxt6.setAttribute('y', (y + 47).toString());
    view.addTxt6.textContent = prizeData[prizeIdx].tickets.partList[7];
    view.part4.setAttribute('x', (x + partC2Xoffset).toString());
    view.part4.setAttribute('y', (y + 48).toString());
    view.part4.textContent = prizeData[prizeIdx].tickets.partList[6];
    view.minus6.setAttribute('cx', (x + minusC2Xoffset).toString());
    view.minus6.setAttribute('cy', (y + 45).toString());

    if (prizeData[prizeIdx].tickets.partList[8]) {
      view.btnAdd8.setAttribute('cx', (x + addC1Xoffset).toString());
      view.btnAdd8.setAttribute('cy', (y + 58).toString());
      view.addTxt8.setAttribute('x', (x + addC1Xoffset).toString());
      view.addTxt8.setAttribute('y', (y + 60).toString());
      view.addTxt8.textContent = prizeData[prizeIdx].tickets.partList[9];
      view.part5.setAttribute('x', (x + partC1Xoffset).toString());
      view.part5.setAttribute('y', (y + 61).toString());
      view.part5.textContent = prizeData[prizeIdx].tickets.partList[8];
      view.minus8.setAttribute('cx', (x + minusC1Xoffset).toString());
      view.minus8.setAttribute('cy', (y + 58).toString());
      if (prizeData[prizeIdx].tickets.partList[10]) {
        view.btnAdd10.setAttribute('cx', (x + addC2Xoffset).toString());
        view.btnAdd10.setAttribute('cy', (y + 58).toString());
        view.addTxt10.setAttribute('x', (x + addC2Xoffset).toString());
        view.addTxt10.setAttribute('y', (y + 60).toString());
        view.addTxt10.textContent = prizeData[prizeIdx].tickets.partList[11];
        view.part6.setAttribute('x', (x + partC2Xoffset).toString());
        view.part6.setAttribute('y', (y + 61).toString());
        view.part6.textContent = prizeData[prizeIdx].tickets.partList[10];
        view.minus10.setAttribute('cx', (x + minusC2Xoffset).toString());
        view.minus10.setAttribute('cy', (y + 58).toString());
        if (prizeData[prizeIdx].tickets.partList[12]) {
          view.btnAdd12.setAttribute('cx', (x + addC1Xoffset).toString());
          view.btnAdd12.setAttribute('cy', (y + 71).toString());
          view.addTxt12.setAttribute('x', (x + addC1Xoffset).toString());
          view.addTxt12.setAttribute('y', (y + 73).toString());
          view.addTxt12.textContent = prizeData[prizeIdx].tickets.partList[13];
          view.part7.setAttribute('x', (x + partC1Xoffset).toString());
          view.part7.setAttribute('y', (y + 74).toString());
          view.part7.textContent = prizeData[prizeIdx].tickets.partList[12];
          view.minus12.setAttribute('cx', (x + minusC1Xoffset).toString());
          view.minus12.setAttribute('cy', (y + 71).toString());
          if (prizeData[prizeIdx].tickets.partList[14]) {
            view.btnAdd14.setAttribute('cx', (x + addC2Xoffset).toString());
            view.btnAdd14.setAttribute('cy', (y + 71).toString());
            view.addTxt14.setAttribute('x', (x + addC2Xoffset).toString());
            view.addTxt14.setAttribute('y', (y + 73).toString());
            view.addTxt14.textContent = prizeData[prizeIdx].tickets.partList[15];
            view.part8.setAttribute('x', (x + partC2Xoffset).toString());
            view.part8.setAttribute('y', (y + 74).toString());
            view.part8.textContent = prizeData[prizeIdx].tickets.partList[14];
            view.minus14.setAttribute('cx', (x + minusC2Xoffset).toString());
            view.minus14.setAttribute('cy', (y + 71).toString());
          }
        }
      }
    }
  };
  view.toggle = (el) => {
    const elem = document.getElementById(el);
    elem.classList.contains('hide') ?  elem.classList.remove('hide') : elem.classList.add('hide');
  };
  view.toggleTokenRequestView = () => {
    view.toggle('emailOrPhone');
    view.toggle('btnSendTokenRequest');
  };
  view.toggleLoginView =() => view.toggle('btnLogin');
  view.toggleCredentialView = () => {
    view.toggleTokenRequestView();
    view.toggleLoginView();
  };
};
acquireView(view);
defineViewFunctions(view);
store.setPrizeDataToRemote = (url, cb) => {
  const ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function () {
    console.log('status',ajaxReq.status);
    if (ajaxReq.status === 200) cb(null, ajaxReq.responseText);
    else cb(ajaxReq.responseText, null);
  });
  ajaxReq.addEventListener('error', function (data) {
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });
  ajaxReq.open('GET', url, true);
  ajaxReq.send();
};
store.incrementTicketPartQuantity = (ticketIdx, ticket, value) => {
  let partList = prizeData[ticketIdx].tickets.partList;
  partList[partList.indexOf(ticket) + 1] += value;
};
//add all svg event handlers
view.svgRoot.addEventListener('click', function (e) {
  try {
    switch (e.target.id) {
      case 'add0':
        adjustTicketQuantity(view.addTxt0, 1, 1);
        break;
      case 'add2':
        adjustTicketQuantity(view.addTxt2, 3, 1);
        break;
      case 'add4':
        adjustTicketQuantity(view.addTxt4, 5, 1);
        break;
      case 'add6':
        adjustTicketQuantity(view.addTxt6, 7, 1);
        break;
      case 'add8':
        adjustTicketQuantity(view.addTxt8, 9, 1);
        break;
      case 'add10':
        adjustTicketQuantity(view.addTxt10, 11, 1);
        break;
      case 'add12':
        adjustTicketQuantity(view.addTxt12, 13, 1);
        break;
      case 'add14':
        adjustTicketQuantity(view.addTxt14, 15, 1);
        break;
      case 'minus0':
        adjustTicketQuantity(view.addTxt0, 1, -1);
        break;
      case 'minus2':
        adjustTicketQuantity(view.addTxt2, 3, -1);
        break;
      case 'minus4':
        adjustTicketQuantity(view.addTxt4, 5, -1);
        break;
      case 'minus6':
        adjustTicketQuantity(view.addTxt6, 7, -1);
        break;
      case 'minus8':
        adjustTicketQuantity(view.addTxt8, 9, -1);
        break;
      case 'minus10':
        adjustTicketQuantity(view.addTxt10, 11, -1);
        break;
      case 'minus12':
        adjustTicketQuantity(view.addTxt12, 13, -1);
        break;
      case 'minus14':
        adjustTicketQuantity(view.addTxt14, 15, -1);
        break;
      case 'goBack':
        reset(e);
        break;
      case 'btnMenu':
          //future feature
        break;
      default:
        view.cardSelected(e.target);
        break;
    }
  }
  catch (e) {
    console.log(e);
  }
});
function reset(e) {
  document.getElementById('w' + e.target.attributes[5].value).classList.remove('less');
  view.largeCardSubTitle.setAttribute('x', '500');
  view.largeCardClose.setAttribute('cx', '500');
  view.btnAdd0.setAttribute('cx', '500');
  view.btnAdd2.setAttribute('cx', '500');
  view.btnAdd4.setAttribute('cx', '500');
  view.btnAdd6.setAttribute('cx', '500');
  view.btnAdd8.setAttribute('cx', '500');
  view.btnAdd10.setAttribute('cx', '500');
  view.btnAdd12.setAttribute('cx', '500');
  view.btnAdd14.setAttribute('cx', '500');
  view.largeCardClose.setAttribute('cx', '500');
  view.minus0.setAttribute('cx', '500');
  view.minus2.setAttribute('cx', '500');
  view.minus4.setAttribute('cx', '500');
  view.minus6.setAttribute('cx', '500');
  view.minus8.setAttribute('cx', '500');
  view.minus10.setAttribute('cx', '500');
  view.minus12.setAttribute('cx', '500');
  view.minus14.setAttribute('cx', '500');
  view.part1.setAttribute('x', '-500');
  view.part2.setAttribute('x', '-500');
  view.part3.setAttribute('x', '-500');
  view.part4.setAttribute('x', '-500');
  view.part5.setAttribute('x', '-500');
  view.part6.setAttribute('x', '-500');
  view.part7.setAttribute('x', '-500');
  view.part8.setAttribute('x', '-500');
  view.addTxt0.setAttribute('x', '500');
  view.addTxt2.setAttribute('x', '500');
  view.addTxt4.setAttribute('x', '500');
  view.addTxt6.setAttribute('x', '500');
  view.addTxt8.setAttribute('x', '500');
  view.addTxt10.setAttribute('x', '500');
  view.addTxt12.setAttribute('x', '500');
  view.addTxt14.setAttribute('x', '500');
  view.svgRoot.setAttribute('viewBox', '-400 -300 800 690');
  if (prizeChanged(store.current.prize.tickets.partList)) {
    console.log('updating prize');
    updatePrize(store.current.prize, store.current.prizeIndex);
  }
}
function adjustTicketQuantity(addBtn, qidx, q) {
  store.current.prize.tickets.partList[qidx] = store.current.prize.tickets.partList[qidx] + q;
  if (store.current.prize.tickets.partList[qidx] < 0) store.current.prize.tickets.partList[qidx] = 0;
  addBtn.textContent = store.current.prize.tickets.partList[qidx];
}

function updatePrize(prize, prizeIdx) {

  if (!prize.tickets.winner) {
    let ticket = checkForRareTicket(prize);
    if (ticket) {
      prize.tickets.winner = ticket;
    }
  }
  ajaxPostJson(updateUserDataResource, {prizeIdx: prizeIdx, prize: prize}, function (err, data) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(data);

  }, localStorage.getItem('token'));
}
function ajaxPostJson(url, jsonData, cb, token) {
  const ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function () {
    if (ajaxReq.status === 200 || ajaxReq.status === 404) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.responseText), null);
  });
  ajaxReq.addEventListener('error', function (data) {
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  if (token) {
    ajaxReq.setRequestHeader('Authorization', token);
  }
  if(jsonData) {
    ajaxReq.send(JSON.stringify(jsonData));
  }
  else{
    ajaxReq.send();
  }

}
function prizeChanged(partList) {
  //if(!grids.rowsEqual(partList, prizeData[currentIndex].tickets.partList)) return true;
  let c = 0;
  for (c; c < partList.length; c++) {
    if (partList[c] !== prizeData[store.current.prizeIndex].tickets.partList[c]) return true;
  }
  return (store.current.prize.tickets.winner !== prizeData[store.current.prizeIndex].tickets.winner);
}
store.setCurrentPrize = (prize) => {
  return {
    name: prize.name,
    value: prize.value,
    available: prize.available,
    tickets: {
      "required": prize.tickets.required,
      partList: [prize.tickets.partList[0], prize.tickets.partList[1], prize.tickets.partList[2], prize.tickets.partList[3], prize.tickets.partList[4], prize.tickets.partList[5], prize.tickets.partList[6], prize.tickets.partList[7], prize.tickets.partList[8], prize.tickets.partList[9], prize.tickets.partList[10], prize.tickets.partList[11], prize.tickets.partList[12], prize.tickets.partList[13], prize.tickets.partList[14], prize.tickets.partList[15], prize.tickets.partList[16]],
      winner: prize.tickets.winner
    },
    startAvailable: prize.startAvailable,
    viewId: prize.viewId
  };
};
/**
 * Takes a prize object and stores tickets with zero quantities into an array, then checks the length of the array. If the length of the array is equal to one, then it returns that ticket as the winning ticket, else it returns ''
 * @param {Object} prize
 * @param {[]} prize.tickets.partList - Of the form [ticketID, quantity,...] for each ticket required to win the prize
 * @returns {string} winning - ticket id or '' if no winner identified
 */
function checkForRareTicket(prize) {
  var ticket = [];
  var len = prize.tickets.partList.length, c = 1;
  for (c; c < len; c += 2) {
    if (prize.tickets.partList[c] == 0) ticket.push(prize.tickets.partList[c - 1]);
  }
  if (ticket.length === 1) return ticket[0];
  return "";
}
/**
 * Set the content for all the prize nodes with the data provided by the array of prize objects
 * @param {Object[]} ary - Array of prize objects
 */
function configureUi(ary) {
  var len = ary.length, c = 0;
  for (c; c < len; c++) {
    setWinningTicket(ary[c]);
    setPrizeTitle(ary[c]);
  }
}
/**
 * If a single ticket is left to win a prize set textContent for winning ticket in the prize DOM node to the ticket id.
 * @param {Object} prize
 * @param {string} prize.viewId - The id of the top level svg that makes up the given prizes DOM node
 */
function setWinningTicket(prize) {
  let ticket, wIdx;
  ticket = checkForRareTicket(prize);
  if (ticket) {
    wIdx = prize.viewId.substr(1);
    document.getElementById('w' + wIdx).textContent = ticket;
  }
}
/**
 * Set title text of SVG to match the name field of the given prize object
 * @param {Object} prize - Object containing all prize data for a single prize
 * @param {string} prize.name - Title of prize
 * @param {string} prize.viewId - The id of the top level svg that makes up the given prizes DOM node
 */
function setPrizeTitle(prize) {
  var tIdx;
  tIdx = prize.viewId.substr(1);
  document.getElementById('t' + tIdx).textContent = prize.name;
}
/**
 *
 * @param value
 */
function ticketInput(value) {
  let ticket = value || document.getElementById('ticket').value.toUpperCase();

  const ticketsAry = prizeData.map(prize => prize.tickets);
  const arrayOfPartsArrays = ticketsAry.map(ticket => ticket.partList);
  const ticketIdx = getTicketIdx(value, arrayOfPartsArrays);
  //winner equal to the prizeData[n].tickets object that contains value as the winner property. If no winner property is equal to value, winner is undefined
  const winner = isAWinningTicket(value, ticketsAry);

  if (ticketIdx < 0) {
    addTicketMessage(false, ticket);
  }
  else {
    const prize = prizeData[ticketIdx];
    if (winner) youWin(prize.viewId);
    else addTicketMessage(prize.viewId, ticket, prize.tickets.partList[prize.tickets.partList.indexOf(ticket) + 1] + 1, prize);
    store.incrementTicketPartQuantity(ticketIdx, ticket, 1);
    updatePrize(prize, prize.current.prizeIndex);
  }
}
function youWin(viewId) {
  const elId = 'w' + viewId.substr(1);
  const el = document.getElementById(elId);
  el.textContent = 'WINNER!';
  el.classList.add('winner');
  el.classList.remove('winnerTxt');
}
function addTicketMessage(viewId, ticket, value, prize) {
  if (!(viewId)) {
    alert('Game piece not found: ' + ticket);
    document.getElementById('ticket').value = '';
  }
  else {
    if (view.current.prize && !Object.is(view.current.prize, prize)) view.setWinningTicketOnPrizeCard(view.current.prize);
    view.setCurrent('prize', prize);
    document.getElementById(`w${prize.viewId.substr(1)}`).textContent = `${ticket} = ${value}`;
  }
}
document.getElementById('btnEnter').addEventListener('click', function () {
  ticketInput();
});
document.getElementById('ticket').addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    ticketInput(e.target.value.toUpperCase());
    e.target.value = '';
  }
});
document.getElementById('ticket').focus();
document.getElementById('btnLogin').addEventListener('click', () => {
  if(!(loggedIn)) logIn();
});
document.getElementById('btnSendTokenRequest').addEventListener('click', () => {
  requestToken(document.getElementById('emailOrPhone').value, (err, data) => {
    console.dir(data);
  });
});
const requestToken = (emailOrPhone, cb) => {
  view.toggleCredentialView();
  const data = {email: emailOrPhone};
  ajaxPostJson(loginResource, data, (err, resData) => {
    cb(`'requestTokenResponse:', ${resData}`);
  });
};
const logIn = () => {
  view.toggleCredentialView();
};
const issueToken = (hash) => {
  ajaxPostJson(authorizationResource,{hash: hash}, (err, resData) => {
    if(err) console.error(err);
    window.localStorage.setItem('token',resData);
    window.location.hash = '';
    getUserData();
  });
};
if(window.location.hash){
  issueToken(window.location.hash.slice(1));
}
const getUserData = () => {
  ajaxPostJson(userDataResource,{'doesnot':'matter'}, (err, data) => {
    if(err) console.error(err);
    if(!data) {//No data sent, token expired need to make more standard determination
      const cacheData = window.localStorage.getItem('prizeData');
      if(cacheData){
        prizeData = JSON.parse(cacheData);
        configureUi(prizeData);
        alert('Your login session has ended, login again to avoid losing local changes');
        return;
      }
    }
    prizeData = data;
    configureUi(prizeData);
  }, window.localStorage.getItem('token'));
};
if(window.localStorage.getItem('token')){
  getUserData();
}
else{
  store.setPrizeDataToRemote(remoteDataUrl, function (err, data) {
    if (err) {
      const cacheData = window.localStorage.getItem('prizeData');
      if(cacheData){
        prizeData = JSON.parse(cacheData);
        configureUi(prizeData);
        alert('Error loading remote data, Your changes will only be stored locally');
        return;
      }
      alert('There was a problem loading prize Data! No local Data, check Internet Connection.');
      console.dir(err);
      return;
    }
    prizeData = JSON.parse(data);
    window.localStorage.setItem('prizeData', data);
    configureUi(prizeData);
  });
}
//Pure functions
const isAWinningTicket = (ticketId, ticketAry) => {
  return ticketAry.find((prizeTicket) => prizeTicket.winner === ticketId);
};
const getTicketIdx = (ticketId, aryOfPartsAry) => {
  let gridRow = grids.getRowStrings(grids.getGridRowByColumnData(aryOfPartsAry, ticketId));
  let grid = aryOfPartsAry.map(row => grids.getRowStrings(row));
  return grids.getRowIdxFromRow(grid, gridRow, 0);
};