/**
 * svg-simple.spec.js
 * Created by dcorns on 6/4/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const expect = require('chai').expect;
const svg = require('../../modules/svg-simple');
describe('svg-simple', () => {
  //This Group test must be run from start to finish to pass. Test includes the testing of accumulators which will fail to have the right values if preceding tests are not executed.
  describe('Group', () => {
    const svgSpecs = [
      {
        width: 10, //2 * radius
        marginLeft: 5,
        marginRight:5,
      },
      {
        width: 30, //characters * character set max width(or character width for mono space)
        marginLeft: 5,
        marginRight:5,
      },
      {
        width: 12, //2 * radius
        marginLeft: 5,
        marginRight:5,
      },
    ];
    const group1 = new svg.Group(svgSpecs,2,5,10,30);
    it('provides an svg group instance when invoked with new', () => {
      expect(group1 instanceof svg.Group).to.be.true;
    });
    describe('Group instance', () => {
      it('initializes the starting x coordinate of the svg columns to the third argument to the constructor + marginLeft of the first argument[0]', () => {
        expect(group1.getColumnX()).to.equal(10);
      });
      it('initializes the starting y coordinate of the svg row to the fourth argument to the constructor', () => {
        expect(group1.getColumnY()).to.equal(10);
      });
      it('has a getTotalColumnWidth function', () => {
        expect(typeof group1.getTotalColumnWidth).to.equal('function');
      });
      it('has a nextElementX function', () => {
        expect(typeof group1.nextElementX).to.equal('function');
      });
      it('has a getNumberOfColumns function', () => {
        expect(typeof group1.getNumberOfColumns).to.equal('function');
      });
      it('has a getColumnStart function', () => {
        expect(typeof group1.getColumnStart).to.equal('function');
      });
      it('has a getColumnX function', () => {
        expect(typeof group1.getColumnX).to.equal('function');
      });
      it('has a getColumnY function', () => {
        expect(typeof group1.getColumnY).to.equal('function');
      });
      describe('getTotalColumnWidth', () => {
        it('returns the width of combined columns defined for a row', () => {
          expect(group1.getTotalColumnWidth()).to.equal(164);
        });
      });
      describe('nextElementX', () => {
        it('returns the initial x coordinate value the first time it is called', () => {
          expect(group1.nextElementX()).to.equal(10);
        });
        it('returns the x coordinate where the anchor of the next element should be placed', () => {
          expect(group1.nextElementX()).to.equal(40);
          expect(group1.nextElementX()).to.equal(71);
        });
        it('iterates over svgSpec the number of times provided by the second argument to the constructor', () => {
          expect(group1.nextElementX()).to.equal(92);
          expect(group1.nextElementX()).to.equal(122);
          expect(group1.nextElementX()).to.equal(153);
        });
        it('resets the x coordinate to the initial start position after completing iterations over svgSpec equal to that specified in the second argument to the constructor', () => {
          expect(group1.nextElementX()).to.equal(10);
          expect(group1.nextElementX()).to.equal(40);
          expect(group1.nextElementX()).to.equal(71);
          expect(group1.nextElementX()).to.equal(92);
          expect(group1.nextElementX()).to.equal(122);
          expect(group1.nextElementX()).to.equal(153);
          expect(group1.nextElementX()).to.equal(10);
        });
        it('increments columnY (y coordinate) by the value of rowStep(fifth argument to constructor) when x coordinate is reset', () => {
          expect(group1.getColumnY()).to.equal(70);
        });
      });
      describe('getNumberOfColumns', () => {
        it('returns the number of columns specified for a row(second argument to constructor)', () => {
          expect(group1.getNumberOfColumns()).to.equal(2);
        })
      });
      describe('getColumnStart', () => {
        it('returns the x coordinate of where each set of columns begins(third argument to constructor)', () => {
          expect(group1.getColumnStart()).to.equal(5);
        })
      });
      describe('getColumnX', () => {
        it('returns the current x coordinate value for the instance', () => {
          expect(group1.getColumnX()).to.equal(10);
        });
      });
      describe('getColumnY', () => {
        it('returns the current y coordinate value if no argument is provided', () => {
          expect(group1.getColumnY()).to.equal(70);
        });
        it('returns the current y coordinate value plus the value provided as an argument', () => {
          expect(group1.getColumnY(5)).to.equal(75);
        });
      });
    });
  });
});