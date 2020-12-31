import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table as TableUI, TableBody, TableCell, TableHead, TableRow, Paper,
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
});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderColumn = (item) => (
    <TableCell style={{ color: 'grey' }} align={(item.align) ? item.align : 'left'}>{(item.label) ? item.label : item.field}</TableCell>
  )

  renderColumns = (columns) => (
    <TableRow>
      {
        columns.map((item) => this.renderColumn(item))
      }
    </TableRow>
  )

  renderRow = (data, col) => (
    <TableCell align={(col.align) ? col.align : 'left'}>
      {data[col.field]}
    </TableCell>
  )

  renderRows = (data, columns) => (
    <TableRow>
      {
        columns.map((col) => this.renderRow(data, col))
      }
    </TableRow>
  )

  render() {
    const {
      classes, data, columns, id,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <TableUI className={classes.table} aria-label="simple table">
          <TableHead>
            { this.renderColumns(columns) }
          </TableHead>
          <TableBody>
            {
              data.map((row) => this.renderRows(row, columns))
            }
          </TableBody>
        </TableUI>
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
    },
  )).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Table.defaultProps = {
  id: '',
};

export default withStyles(styles)(Table);
