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

  renderColumn = (item) => {
    const { order, orderBy, onSort } = this.props;
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
  }

  renderColumns = (columns) => (
    <TableRow>
      {
        columns.map((item) => this.renderColumn(item))
      }
    </TableRow>
  )

  renderRow = (data, col) => {
    const { onSelect } = this.props;
    let value = data[col.field];
    if (col.format) {
      value = col.format(value);
    }

    return (
      <TableCell align={(col.align) ? col.align : 'left'} onClick={(event) => onSelect(event, data.id)}>
        {value}
      </TableCell>
    );
  }

  renderRows = (data, columns) => {
    const { classes, actions } = this.props;
    return (
      <TableRow className={classes.row} hover>
        {
          columns.map((col) => this.renderRow(data, col))
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
  }

  render() {
    const {
      classes, data, columns, id, count, rowsPerPage, page, onChangePage,
    } = this.props;
    return (
      <Paper className={classes.root} key={id}>
        <TableUI className={classes.table} aria-label="simple table">
          <TableHead>
            { this.renderColumns(columns) }
          </TableHead>
          <TableBody>
            {
              data.map((row) => this.renderRows(row, columns, classes))
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

export default withStyles(styles)(Table);
