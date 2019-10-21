import {gql} from 'apollo-boost'

export const userQuery = gql`
{
    users {
        contact
        id
    }
}
`