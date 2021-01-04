import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AddDialogue } from './components';
import { Table } from '../../components';
import trainee from './data/trainee';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: props.order,
      orderBy: props.orderBy,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (temp) => {
    this.setState({ open: false });
  }

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
    const { open, order, orderBy } = this.state;
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
          data={trainee}
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
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        { this.renderTrainees() }
        <AddDialogue open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TraineeList;
