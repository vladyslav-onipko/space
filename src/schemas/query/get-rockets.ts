import { gql } from '@apollo/client';

export const GET_ROCKETS = gql`
  query {
    rockets {
      id
      description
      name
    }
  }
`;
