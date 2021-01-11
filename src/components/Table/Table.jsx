import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableSortLabel,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';

import hoc from '../HOC/index';

const styles = (theme) => ({
  root: {
    width: '96%',
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id, columns, classes, order, orderBy, onSort, onSelect,
      actions, data, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
    } = this.props;
    return (
      <TableUI component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                columns.length && columns.map(({
                  align, field, lable,
                }) => (
                  <TableCell
                    align={align}
                    className={classes.tableHeader}
                  >
                    <TableSortLabel
                      active={orderBy === field}
                      direction={orderBy === field ? order : 'asc'}
                      onClick={onSort(field)}
                    >
                      {lable}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((item) => (
              <TableRow className={classes.tableRow} key={item[id]}>
                {
                  columns && columns.length && columns.map(({ align, field, format }) => (
                    <TableCell onClick={(event) => onSelect(event, item.name)} align={align} component="th" scope="row" order={order} ordery={orderBy}>
                      {format ? format(item[field]) : item[field]}
                    </TableCell>
                  ))
                }
                {actions && actions.length && actions.map(({ icon, handler }) => (
                  <TableRow>
                    <IconButton onClick={() => handler(item)}>
                      {icon}
                    </IconButton>
                  </TableRow>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={0}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Table>
      </TableUI>
    );
  }
}
Table.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
Table.defaultProps = {
  order: 'asc',
  orderBy: '',
};
export default withStyles(styles)(Table);
