import {gql} from 'apollo-boost'

export const createUserMutation = gql`
mutation createUser(
	$contact: String!
	$password: String!
	$first_name: String!
	$last_name: String!
){
	createUser(
		contact: $contact
		password: $password
		firstName: $first_name
		lastName: $last_name
	){
		ok
	  	user {
			contact
			firstName
			lastName
	  	}
	}
}
`

export const loginUserMutation = gql`
mutation login(
	$contact: String!
	$password: String!
) {
	loginUser(
		contact: $contact
		password: $password
	) {
		token
		loggedIn
	}
}
`