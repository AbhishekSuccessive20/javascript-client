import { gql } from '@apollo/client';

const GETALL_TRAINEE = gql`query GetallTrainee($skip: String, $limit: String) {
  getAllTrainee(options: { skip: $skip, limit: $limit }) {
    message
    status
    data{
      Total_Count
      records{
        email
        name
        createdAt
        originalId
        _id
      }
    }
  }
}`;

export {
  GETALL_TRAINEE,
};
