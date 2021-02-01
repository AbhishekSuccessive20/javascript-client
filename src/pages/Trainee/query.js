import { gql } from '@apollo/client';

const GETALL_TRAINEE = gql`query GetallTrainee($skip: Int, $limit: Int) {
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
      }
    }
  }
}`;

export {
  GETALL_TRAINEE,
};
