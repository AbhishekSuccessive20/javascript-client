/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table } from '../../components';
import trainee from './data/trainee';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';
import { AddDialogue, EditDialog, RemoveDialog } from './components';
import callApi from '../../lib/utils/api';
import { SnackBarContext } from '../../contexts/index';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: props.order,
      orderBy: props.orderBy,
      deleteOpen: false,
      editOpen: false,
      traineeData: {},
      page: 0,
      dataObj: [],
      rowsPerPage: 10,
      limit: 20,
      skip: 0,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  }

  handleEditClose = () => {
    this.setState({ editOpen: false });
  }

  handleEditDialogOpen = (event, data) => {
    event.preventDefault();
    this.setState({ editOpen: true, traineeData: data });
  }

  handleRemoveDialogOpen = (event, data) => {
    event.preventDefault();
    this.setState({ deleteOpen: true, traineeData: data });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.componentDidMount(page);
  }

  handleSubmit = (temp) => {
    this.setState({ open: false });
  }

  componentDidMount = () => {
    const { limit, skip, dataObj } = this.state;
    const value = this.context;
    callApi(`trainee/getall?skip=${skip}&limit=${limit}`, 'get', {}).then((response) => {
      if (response.data === undefined) {
        this.setState({
          message: 'This is an error while displaying Trainee',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        const { records, count } = response.data;
        this.setState({ dataObj: records });
        return response;
      }
      console.log('dataObj : ', dataObj);
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  renderTrainee = (item, index) => {
    const { match } = this.props;
    return (
      <li key={index}>
        <Link to={`${match.path}/${item.id}`}>
          {item.name}
        </Link>
      </li>
    );
  }

  renderTrainees = () => (
    <ul>
      {
        trainee.map((item, index) => this.renderTrainee(item, index))
      }
    </ul>
  )

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    if (orderBy !== field) {
      this.setState({
        order: 'asc',
        orderBy: field,
      });
    } else {
      this.setState({
        order: (order) === 'asc' ? 'desc' : 'asc',
        orderBy: field,
      });
    }
  }

  handleSelect = (event, id) => {
    const { history, match } = this.props;
    event.preventDefault();
    history.push(`${match.path}/${id}`);
  }

  render() {
    const {
      open, order, orderBy, traineeData, page, deleteOpen, editOpen,
      rowsPerPage, deleteData, dataObj,
    } = this.state;
    return (
      <>
        <br />
        <div style={{ marginRight: '2%' }} align="right">
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            ADD TRAINEELIST
          </Button>
        </div>
        <Table
          id="id"
          data={dataObj}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]
          }
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          rowsPerPage={5}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        {this.renderTrainees()}
        <AddDialogue
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
        />
        <RemoveDialog
          deleteOpen={deleteOpen}
          onClose={this.handleDeleteClose}
          details={traineeData}
        />
        <EditDialog
          editOpen={editOpen}
          onClose={this.handleEditClose}
          details={traineeData}
        />
      </>
    );
  }
}

TraineeList.contextType = SnackBarContext;
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

TraineeList.defaultProps = {
  orderBy: '',
  order: 'asc',
};

export default TraineeList;
