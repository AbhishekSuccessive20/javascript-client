import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table } from '../../components';
import callApi from '../../lib/utils/api';
import { limit } from '../../configs/constants';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';
import { AddDialogue, EditDialog, RemoveDialog } from './components';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: props.order,
      orderBy: props.orderBy,
      deleteOpen: false,
      editOpen: false,
      traineeData: {},
      records: [],
      totalRecords: 0,
      page: 0,
      loader: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const header = localStorage.getItem('token');
    const { page: statePage } = this.state;
    const params = {
      skip: statePage * limit,
      limit,
    };
    this.setState({ loader: true });
    await callApi('/trainee', 'GET', {}, header, params)
      .then((data) => {
        this.setState({
          records: data.data.Trainees.data.records,
          totalRecords: data.data.Trainees.data.count,
        }, () => {
          const { records } = this.state;
          if (records.length === 0 && statePage) {
            this.setState({ page: statePage - 1 }, () => this.getData());
          }
        });
      })
      .catch((err) => {
        if (err.response.data.status === 401) {
          localStorage.removeItem('token');
        }
      });
    this.setState({ loader: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  }

  handleDeleteSubmit = () => {
    this.setState({ deleteOpen: false }, () => {
      this.getData();
    });
  }

  handleEditClose = () => {
    this.setState({ editOpen: false });
  }

  handleEditDialogOpen = (event, data) => {
    event.preventDefault();
    this.setState({ editOpen: true, traineeData: data });
  }

  handleEditSubmit = () => {
    this.setState({ editOpen: false });
    this.getData();
  }

  handleRemoveDialogOpen = (event, data) => {
    event.preventDefault();
    this.setState({ deleteOpen: true, traineeData: data });
  };

  handleSubmit = (temp) => {
    this.setState({ open: false }, () => this.getData());
    this.getData();
  }

  renderTrainee = (item, index) => {
    const { match } = this.props;
    const { page } = this.state;
    const skip = page * limit;
    return (
      <li key={index}>
        <Link to={{ pathname: `${match.path}/${item.id}`, state: { skip, limit } }}>
          {item.name}
        </Link>
      </li>
    );
  }

  renderTrainees = () => {
    const { records } = this.state;
    return (
      <ul>
        {
          records.map((item, index) => this.renderTrainee(item, index))
        }
      </ul>
    );
  }

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

  handleChangePage = (event, page) => {
    event.preventDefault();
    this.setState({ page }, () => this.getData());
  }

  handleSelect = (event, id) => {
    const { history, match } = this.props;
    const { page } = this.state;
    const skip = page * limit;
    event.preventDefault();
    history.push(`${match.path}/${id}`, { skip, limit });
  }

  render() {
    const {
      open,
      order,
      orderBy,
      traineeData, page, deleteOpen, editOpen, records, totalRecords, loader,
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
          data={records}
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
          count={totalRecords}
          rowsPerPage={limit}
          page={page}
          onChangePage={this.handleChangePage}
          loader={loader}
          dataLength={totalRecords}
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
