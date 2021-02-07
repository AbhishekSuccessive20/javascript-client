/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/react-hoc';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles';
import Compose from 'lodash.flowright';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Mutation } from '@apollo/react-components';
import { Table } from '../../components';
import { AddDialogue, EditDialog, RemoveDialog } from './components';
import { GETALL_TRAINEE } from './query';
import { UPDATE_TRAINEE, CREATE_TRAINEE } from './mutation';
import { SnackBarContext } from '../../contexts/index';
import { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB } from './Subscription';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  onSubmitAdd = async (data, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data;
      console.log('data :', name, email, password);
      await createTrainee({ variables: { name, email, password } });
      refetch();
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  }

  handleSelect = (event) => {
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('Deleted Item ', deleteData);
  };

  // eslint-disable-next-line no-unused-vars
  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  onSubmitEdit = async (data, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      refetch();
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  handlePageChange = (refetch) => (event, newPage) => {
    // const { rowsPerPage } = this.state;
    const { data: { variables } } = this.props;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ variables });
    });
  }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...record].map((records) => {
          console.log('ddddd ', records);
          if (records.originalId === traineeUpdated.originalId) {
            console.log('found match ');
            return {
              ...records,
              ...traineeUpdated,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount,
            record: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        console.log(' sub delete : ', traineeDeleted.data.originalId);
        // eslint-disable-next-line max-len
        const updatedRecords = [...record].filter((records) => records.originalId !== traineeDeleted.data.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount - 1,
            record: updatedRecords,
          },
        };
      },
    });
  }

  render() {
    const {
      open, order, orderBy, page,
      rowsPerPage, EditOpen, RemoveOpen, editData, deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { record = [], TraineeCount = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    console.log('records  is == ', record);
    const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
    return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GETALL_TRAINEE, variables }]}
        >
          {(createTrainee, createrLoader = { loading }) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GETALL_TRAINEE, variables }]}
            >
              {(updateTrainee, updateLoader = { loading }) => (
                <SnackBarContext.Consumer>
                  {({ openSnackBar }) => (
                    <>
                      <div className={classes.root}>
                        <div className={classes.dialog}>
                          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            ADD TRAINEELIST
                          </Button>
                          <AddDialogue
                            open={open}
                            onClose={this.handleClose}
                            onSubmit={
                              (data) => this.onSubmitAdd(
                                data, openSnackBar, createTrainee, refetch,
                              )
                            }
                            loading={createrLoader}
                          />
                        </div>
          &nbsp;
          &nbsp;
                        <EditDialog
                          Editopen={EditOpen}
                          handleEditClose={this.handleEditClose}
                          handleEdit={
                            (data) => this.onSubmitEdit(
                              data, openSnackBar, updateTrainee, refetch,
                            )
                          }
                          data={editData}
                          loading={updateLoader}
                        />
                        <br />
                        <RemoveDialog
                          data={deleteData}
                          onClose={this.handleRemoveClose}
                          onSubmit={this.handleRemove}
                          open={RemoveOpen}
                          refetch={refetch}
                        />
                        <br />
                        <br />
                        <Table
                          loader={loading}
                          id="id"
                          data={record}
                          column={
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
                                format: this.getDateFormat,
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
                          onSort={this.handleSort}
                          orderBy={orderBy}
                          order={order}
                          onSelect={this.handleSelect}
                          count={TraineeCount}
                          page={page}
                          onChangePage={this.handlePageChange(refetch)}
                          rowsPerPage={rowsPerPage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    </>
                  )}
                </SnackBarContext.Consumer>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = SnackBarContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GETALL_TRAINEE, {
    options: { variables: { skip: 0, limit: 50, sort: 'name' } },
  }),
)(TraineeList);
