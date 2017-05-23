'use strict';
const expect = require('chai').expect;
const drcGrids = require('../../modules/drc-grids');
describe('drc-grids.js', () => {

  describe('getRowStrings(row)', () => {
    it('Returns an array of the strings contained in row', () => {
      expect(drcGrids.getRowStrings(['f', 108, 'a', 34, 'g', 4, '', 34, 23, 108])).to.deep.equal(['f', 'a', 'g', '']);
    });
    it('It throws a TypeError error for non array input', () => {
      expect(() => drcGrids.getRowStrings(4)).to.throw(TypeError, /Input must be an array/);
      expect(() => drcGrids.getRowStrings()).to.throw(TypeError, /Input must be an array/);
      expect(() => drcGrids.getRowStrings({})).to.throw(TypeError, /Input must be an array/);
      expect(() => drcGrids.getRowStrings('')).to.throw(TypeError, /Input must be an array/);
    });
    it('Returns an empty array if the row does not contain strings', () => {
      expect(drcGrids.getRowStrings([108, 34, 4, 34, 23, 108, {}])).to.deep.equal([]);
    });
  });
  describe('rowsEqual(row, row)', () => {
    it('Returns true if two arrays are given as input and they are equal', () => {
      expect(drcGrids.rowsEqual([34, 5, 's', 'hello'], [34, 5, 's', 'hello'])).to.be.true;
      expect(drcGrids.rowsEqual([], [])).to.be.true;
    });
    it('Returns false if two arrays inputs are not equal', () => {
      expect(drcGrids.rowsEqual([34, 5, 's', 'hello'], [34, 5, 's', 'hello'].reverse())).to.be.false;
      expect(drcGrids.rowsEqual([34, 5, 's', 'hello'], [34, 5, 's', 'hello world'])).to.be.false;
      expect(drcGrids.rowsEqual([34, 5, 's', 'hello'], [34, 5, 's', 'hello', 'plus one'])).to.be.false;
    });
    it('Throws a TypeError if input is not two arrays', () => {
      testThrowIfNot2ArrayArguments(drcGrids.rowsEqual, /Input must be two arrays/);
    });
  });
  describe('getRowIdxFromRow(grid, row)', () => {
    it('Returns the Y index of the row if it exists in the grid', () => {
      expect(drcGrids.getRowIdxFromRow([
          ['x', 2, 'g', 5, 'r', 9],
          ['x1', 2, 'g1', 5, 'r1', 9],
          ['x2', 2, 'g2', 5, 'r2', 9],
          ['x3', 2, 'g3', 5, 'r3', 9]
        ],
        ['x2', 2, 'g2', 5, 'r2', 9])).to.equal(2);
    });
    it('Returns -1 if row does not exist in grid', () => {
      expect(drcGrids.getRowIdxFromRow([
          ['x', 2, 'g', 5, 'r', 9],
          ['x1', 2, 'g1', 5, 'r1', 9],
          ['x2', 2, 'g2', 5, 'r2', 9],
          ['x3', 2, 'g3', 5, 'r3', 9]
        ],
        ['noMatch', 2, 'g2', 5, 'r2', 9])).to.equal(-1);
      expect(drcGrids.getRowIdxFromRow([
          ['x', 2, 'g', 5, 'r', 9],
          ['x1', 2, 'g1', 5, 'r1', 9],
          ['x2', 2, 'g2', 5, 'r2', 9],
          ['x3', 2, 'g3', 5, 'r3', 9]
        ],
        ['x2', 2, 'g2', 5, 'r2', 9, 'to long'])).to.equal(-1);
      expect(drcGrids.getRowIdxFromRow([
          ['x', 2, 'g', 5, 'r', 9],
          ['x1', 2, 'g1', 5, 'r1', 9],
          ['x2', 2, 'g2', 5, 'r2', 9],
          ['x3', 2, 'g3', 5, 'r3', 9]
        ],
        ['x2', 2, 'g2', 5, 'r2', 9].reverse())).to.equal(-1);
    });
    it('returns -1 if grid and row are empty arrays', () => {
      expect(drcGrids.getRowIdxFromRow([], [])).to.equal(-1);
      expect(drcGrids.getRowIdxFromRow([], [[]])).to.equal(-1);
    });
    it('Throws TypeError if not passed two arrays', () => {
      testThrowIfNot2ArrayArguments(drcGrids.getRowIdxFromRow, /Input must be 2dimArray, Array/);
    });
    it('Throws TypeError if grid is not a 2dimArray', () => {
      expect(() => drcGrids.getRowIdxFromRow(['a', 'b'], ['a', 'b'])).to.throw(TypeError, /Grid must be a 2 dimensional Array/);
    });
  });
  describe('getGridRowByColumnData(grid, columnData)', () => {
    it('returns row from a grid based on one of the row column\'s data (columnData)', () => {
      expect(drcGrids.getGridRowByColumnData([[24, 32, 'a'], [43, 21, 56], [73, 'r', {}]], 'r')).to.deep.equal([73, 'r', {}]);
    });
    it('returns [] if the columnData does not exist in any of the grid rows', () => {
      expect(drcGrids.getGridRowByColumnData([[24, 32, 'a'], [43, 21, 56], [73, 'r', {}]], 12)).to.deep.equal([]);
    });
    it('returns [] if the grid is empty', () => {
      expect(drcGrids.getGridRowByColumnData([[]])).to.deep.equal([]);
      expect(drcGrids.getGridRowByColumnData([[]], 'x')).to.deep.equal([]);
    });
    it('throws TypeError if grid is not a 2 dimensional array', () => {
      expect(() => drcGrids.getGridRowByColumnData('x', [])).to.throw(TypeError, /Input must be 2dimArray, Any/);
      expect(() => drcGrids.getGridRowByColumnData([])).to.throw(TypeError, /Input must be 2dimArray, Any/);
    });
  });
  describe('isGrid(grid)', () => {
    it('returns true if input is a 2 dimensional array', () => {
      expect(drcGrids.isGrid([[3, 5, 'z'], ['q', 't', 9]])).to.be.true;
    });
    it('returns false if input is not a grid', () => {
      expect(drcGrids.isGrid([3, 5, 'z'])).to.be.false;
      expect(drcGrids.isGrid([])).to.be.false;
    });
    it('returns false if input is not an array', () => {
      expect(drcGrids.isGrid('t')).to.be.false;
      expect(drcGrids.isGrid()).to.be.false;
    });
  });
  describe('getGridRowIdxFromRow(grid, row)', () => {
    it('returns the grid index of the grid row matching row', () => {
      expect(drcGrids.getGridRowIndexFromRow([['r', 3, 8, 'y'], ['h', 3, 8, 'q'], ['h', 3], ['h', 3, 8, 'y'], ['h', 3, 8, 'y', 'z']], ['h', 3, 8, 'y'])).to.equal(3);
    });
    it('stops searching the grid at the first occurrence of a matching row', () => {
      expect(drcGrids.getGridRowIndexFromRow([['h', 3, 8, 'y'], ['h', 3, 8, 'y']], ['h', 3, 8, 'y'])).to.equal(0);
    });
    it('it returns -1 if the row does not exist in the grid', () => {
      expect(drcGrids.getGridRowIndexFromRow([['r', 3, 8, 'y'], ['h', 3, 8, 'q'], ['h', 3], ['h', 3, 8, 'y'], ['h', 3, 8, 'y', 'z']], ['h', 3, 8, 'y', 'x'])).to.equal(-1);
    });
    it('Throws TypeError if not passed two arrays', () => {
      testThrowIfNot2ArrayArguments(drcGrids.getGridRowIndexFromRow, /Input must be 2dimArray, Array/);
    });
    it('Throws TypeError if grid is not a 2dimArray', () => {
      expect(() => drcGrids.getGridRowIndexFromRow(['a', 'b'], ['a', 'b'])).to.throw(TypeError, /The first argument must be a 2 dimensional Array/);
    });
  });
  describe('setColumnData(row, rowIdx, value)', () => {
    it('returns a shallow copy of row with the column at rowIdx set to value', () => {
      let row = ['a', 3, 'c'];
      expect(drcGrids.setColumnData(row, 1, 'b')).to.deep.equal(['a', 'b', 'c']);
      expect(drcGrids.setColumnData(row, 1, 'b')).not.deep.equal(row);
    });
    it('returns a copy of the row if no value is passed', () => {
      expect(drcGrids.setColumnData(['r', 2], 1)).to.deep.equal(['r', 2]);
    });
    it('it throws TypeError argument 1 is not an array', () => {
      expect(() => drcGrids.setColumnData('x')).to.throw(TypeError, /The first argument must be an array/);
    });
    it('it throws TypeError argument 2 is not an positive integer', () => {
      expect(() => drcGrids.setColumnData([],'5')).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
      expect(() => drcGrids.setColumnData([], -5)).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
      expect(() => drcGrids.setColumnData([], 6.2)).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
    });
  });
  describe('setGridRowData(grid, gridRowIdx, row)', () => {
    let grid = [[3,6,2,'a'], ['x', 4, 'c'], [0, 't', 12, 7], [1,2]];
    it('returns a shallow copy of grid where the value at gridRowIdx equals row', () => {
      expect(drcGrids.setGridRowData(grid, 2, [4, 'p', 'x', 7])).to.deep.equal([[3,6,2,'a'], ['x', 4, 'c'], [4, 'p', 'x', 7], [1,2]]);
      expect(drcGrids.setGridRowData(grid, 2, [4, 'p', 'x', 7])).to.not.deep.equal(grid);
    });
    it('returns a copy of the grid if no row is passed', () => {
      expect(drcGrids.setGridRowData(grid, 2)).to.deep.equal(grid);
    });
    it('throws TypeError if argument 1 is not a 2 dimensional array', () => {
      expect(() => drcGrids.setGridRowData(3, 2, [])).to.throw(TypeError, /The first argument must be a 2 dimensional array/);
      expect(() => drcGrids.setGridRowData([], 2, [])).to.throw(TypeError, /The first argument must be a 2 dimensional array/);
    });
    it('throws TypeError if argument 2 is not a positive integer or 0', () => {
      expect(() => drcGrids.setGridRowData(grid, '2', [])).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
      expect(() => drcGrids.setGridRowData(grid, -2, [])).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
      expect(() => drcGrids.setGridRowData(grid, 2.2, [])).to.throw(TypeError, /The second argument must be 0 or a positive integer/);
    });
    it('throws TypeError if argument 3 is not an array', () => {
      expect(() => drcGrids.setGridRowData(grid, 2, 4)).to.throw(TypeError, /The third argument must be an array/);
    });
  });
  describe('setGridColumnData(grid, gridRowIdx, ColumnIdx, value)', () => {
    let grid = [[3,6,2,'a'], ['x', 4, 'c'], [0, 't', 12, 7], [1,2]];
    it('returns a shallow copy of grid with the column data at gridRowIdx, ColumnIdx set to value', () => {
      expect(drcGrids.setGridColumnData(grid, 1, 3, 'added new column')).to.deep.equal([[3,6,2,'a'], ['x', 4, 'c', 'added new column'], [0, 't', 12, 7], [1,2]]);
    });
    it('throws TypeError if argument 1 is not a 2 dimensional array', () => {
      expect(() => drcGrids.setGridColumnData(3, 1, 3, 'added new column')).to.throw(TypeError, /The first argument must be a 2 dimensional array/);
      expect(() => drcGrids.setGridColumnData([], 1, 3, 'added new column')).to.throw(TypeError, /The first argument must be a 2 dimensional array/);
    });
  });
});

const testThrowIfNot2ArrayArguments = (f, msg) => {
  expect(() => f([])).to.throw(TypeError, msg);
  expect(() => f([], {})).to.throw(TypeError, msg);
  expect(() => f(7, [])).to.throw(TypeError, msg);
  expect(() => f([], 'hello')).to.throw(TypeError, msg);
  expect(() => f()).to.throw(TypeError, msg);
};