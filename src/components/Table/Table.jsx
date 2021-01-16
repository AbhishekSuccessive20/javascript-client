import React from 'react';
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

import { withLoaderAndMessage } from '../HOC';

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

function Table(props) {
  const renderColumn = (item) => {
    const { order, orderBy, onSort } = props;
    return (
      <TableCell style={{ color: 'grey' }} align={(item.align) ? item.align : 'left'}>
        <TableSortLabel
          active={orderBy === item.field}
          direction={order}
          onClick={() => onSort(item.field)}
          align={(item.align) === 'right' ? 'left' : 'right'}
        >
          {item.label ? item.label : item.field}
        </TableSortLabel>
      </TableCell>
    );
  };

  const renderColumns = (columns) => (
    <TableRow>
      {
        columns.map((item) => renderColumn(item))
      }
    </TableRow>
  );

  const renderRow = (data, col) => {
    const { onSelect } = props;
    let value = data[col.field];
    if (col.format) {
      value = col.format(value);
    }

    return (
      <TableCell align={(col.align) ? col.align : 'left'} onClick={(event) => onSelect(event, data.id)}>
        {value}
      </TableCell>
    );
  };

  const renderRows = (data, columns) => {
    const { classes, actions } = props;
    return (
      <TableRow className={classes.row} hover>
        {
          columns.map((col) => renderRow(data, col))
        }
        <TableCell>
          {
            actions.map((action) => (
              <IconButton onClick={(event) => action.handler(event, data)}>
                {action.icon}
              </IconButton>
            ))
          }
        </TableCell>
      </TableRow>
    );
  };

  const {
    classes, data, columns, id, count, rowsPerPage, page, onChangePage,
  } = props;

  return (
    <Paper className={classes.root}>
      <TableUI key={id} className={classes.table} aria-label="simple table">
        <TableHead>
          { renderColumns(columns) }
        </TableHead>
        <TableBody>
          {
            data
              .map((row) => renderRows(row, columns))
          }
        </TableBody>
      </TableUI>
      {
        count
          ? (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={onChangePage}
            />
          )
          : ''
      }
    </Paper>
  );
}

Table.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape(
    {
      field: PropTypes.string.isRequired,
      label: PropTypes.string,
      align: PropTypes.string,
      format: PropTypes.func,
    },
  )).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

Table.defaultProps = {
  id: '',
  order: 'asc',
  orderBy: '',
  onSort: () => {},
  onSelect: () => {},
  onChangePage: () => {},
  page: 0,
  rowsPerPage: 100,
};

export default withLoaderAndMessage(withStyles(styles)(Table));
