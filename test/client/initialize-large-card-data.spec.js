/**
 * initialize-large-card-data.spec.js
 * Created by dcorns on 6/5/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const expect = require('chai').expect;
const initLargeCardData = require('../../modules/initialize-large-card-data');

describe('initialize-large-card-data', () => {
  const partList = ['partName1',5,'pn2',23,'pn3',11,'pn4',19,'pn5',3,'pn6',0,'pn7',9];
  const data = {
    partList:partList,
    winner: 'A Winning Ticket'
  };
  const view = {
    part0:{
      textContent:''
    },
    part1:{
      textContent:''
    },
    part2:{
      textContent:''
    },
    part3:{
      textContent:''
    },
    part4:{
      textContent:''
    },
    part5:{
      textContent:''
    },
    part6:{
      textContent:''
    },
    addTxt0:{
      textContent:''
    },
    addTxt1:{
      textContent:''
    },
    addTxt2:{
      textContent:''
    },
    addTxt3:{
      textContent:''
    },
    addTxt4:{
      textContent:''
    },
    addTxt5:{
      textContent:''
    },
    addTxt6:{
      textContent:''
    },
    largeCardSubTitle:{
      textContent:''
    }
  };
  initLargeCardData(view, data);
  it('sets the view.partN(first argument) textContent to odd index values from data.partList(second argument)', () => {
    expect(view.part0.textContent).equal('partName1');
    expect(view.part1.textContent).equal('pn2');
    expect(view.part2.textContent).equal('pn3');
    expect(view.part3.textContent).equal('pn4');
    expect(view.part4.textContent).equal('pn5');
    expect(view.part5.textContent).equal('pn6');
    expect(view.part6.textContent).equal('pn7');
  });
  it('sets the view.addTxtN(first argument) textContent to even index values from data.partList(second argument)', () => {
    expect(view.addTxt0.textContent).equal(5);
    expect(view.addTxt1.textContent).equal(23);
    expect(view.addTxt2.textContent).equal(11);
    expect(view.addTxt3.textContent).equal(19);
    expect(view.addTxt4.textContent).equal(3);
    expect(view.addTxt5.textContent).equal(0);
    expect(view.addTxt6.textContent).equal(9);
  });
  it('set the view.largeCardSubTitle(first argument) textContent to Winning Ticket: + data.winner(second argument)', () => {
    expect(view.largeCardSubTitle.textContent).equal('Winning Ticket: A Winning Ticket');
  });
});