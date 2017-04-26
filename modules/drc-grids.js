/**
 * drc-grids
 * Created by dcorns on 4/4/17
 * Copyright © 2017 Dale Corns
 */
'use strict';
const rowsEqual = (r1, r2) =>{
  if(!(Array.isArray(r1)) || !(Array.isArray(r2))) throw new TypeError('Input must be two arrays');
  if(!(r1.length === r2.length)) return false;
  if(r1.length < 100) {
    return  r1.reduce((out, r) => {
      return out && (r === r2[r1.indexOf(r)]);
    }, true);
  }
  //Implement code to efficiently handle large arrays by dividing into chunks to test equality without always traversing the entire array.
  else throw new TypeError('Arrays are too large');
};
const isGrid = (grid) => {
  if(!Array.isArray(grid)) return false;
  if(grid.length < 1) return false;
  return grid.reduce((result, g) => {
    return result && Array.isArray(g);
  }, true);
};
const setColumnData = (row, rowIdx, value) => {
  if(!Array.isArray(row)) throw new TypeError('The first argument must be an array');
  if(!Number.isInteger(rowIdx)) throw new TypeError('The second argument must be 0 or a positive integer');
  if(rowIdx < 0) throw new TypeError('The second argument must be 0 or a positive integer');
  const rowCopy = row.slice();
  rowCopy[rowIdx] = value || row[rowIdx];
  return rowCopy;
};
const setGridRowData = (grid, gridRowIdx, row) => {
  if(!Number.isInteger(gridRowIdx)) throw new TypeError('The second argument must be 0 or a positive integer');
  if(gridRowIdx < 0) throw new TypeError('The second argument must be 0 or a positive integer');
  if(row && !Array.isArray(row)) throw new TypeError('The third argument must be an array');
  if(!(isGrid(grid))) throw new TypeError('The first argument must be a 2 dimensional array');
  const gridCopy = grid.slice();
  gridCopy[gridRowIdx] = row || grid[gridRowIdx];
  return gridCopy;
};

module.exports = {
  getRowStrings: (row) => {
    if(!(Array.isArray(row))) throw new TypeError('Input must be an array');
    return row.filter(r => typeof r === 'string');
  },
  rowsEqual: rowsEqual,
  getRowIdxFromRow: function getRowIdxFromRow(grid, row){
    if(!(Array.isArray(grid)) || !(Array.isArray(row))) throw new TypeError('Input must be 2dimArray, Array');
    return grid.reduce((out, r, idx) => {
      let x;
      try{
        x = (rowsEqual(r, row)) ? idx + 1 : 0;
      }
      catch (e){
        throw new TypeError('Grid must be a 2 dimensional Array')
      }
      return out + x;
    }, -1);
  },
  getGridRowByColumnData: (grid, columnData) => {
    if(!isGrid(grid)) throw new TypeError('Input must be 2dimArray, Any');
    return (grid.find((gridRows) => {
      return gridRows.indexOf(columnData) > -1;
    })) || [];
  },
  isGrid: isGrid,
  getGridRowIndexFromRow: function getGridRowIndexFromRow (grid, row, gridIdx = 0, rowIdx = 0) {
    if(!(Array.isArray(grid)) || !(Array.isArray(row))) throw new TypeError('Input must be 2dimArray, Array');
    if(!isGrid(grid)) throw new TypeError('The first argument must be a 2 dimensional Array');
    if(gridIdx === grid.length) return -1;
    if (grid[gridIdx][rowIdx] !== row[rowIdx] || grid[gridIdx].length !== row.length) return getGridRowIndexFromRow(grid, row, ++gridIdx, rowIdx);
    if (rowIdx === row.length - 1) return gridIdx;
    else{
      return getGridRowIndexFromRow(grid, row, gridIdx, ++rowIdx);
    }
  },
  setGridColumnData: (grid, gridRowIdx, columnIdx, value) => {
    if(!(isGrid(grid))) throw new TypeError('The first argument must be a 2 dimensional array');
    const gridCopy = grid.slice();
    return setGridRowData(gridCopy, gridRowIdx, setColumnData(gridCopy[gridRowIdx], columnIdx, value));
  },
  setColumnData: setColumnData,
  setGridRowData: setGridRowData,
};