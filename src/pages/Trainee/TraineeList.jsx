import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AddDialogue } from './components';
import trainee from './data/trainee';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  render() {
    const { open } = this.state;
    return (
      <>
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          ADD TRAINEELIST
        </Button>
        {this.renderTrainees()}
        <AddDialogue open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
