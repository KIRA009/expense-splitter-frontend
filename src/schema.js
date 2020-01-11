import {gql} from 'apollo-boost'

export const getUserQuery = gql`
query user {
	user {
		contact
	}
}
`

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

export const getReceivedFriendRequestsQuery = gql`
query user {
	user {
		userReceived {
			fromUser {
				contact
			}
		}
	}
}
`

export const getSentFriendRequestsQuery = gql`
query user {
	user {
		userSent {
			toUser {
				contact
			}
		}
	}
}
`

export const acceptRequestMutation = gql`
mutation acceptFriendRequest (
	$contact: String!
) {
	acceptFriendRequest (
		contactSender: $contact
	) {
		ok
	}
}
`

export const deleteRequestMutation = gql`
mutation deleteFriendRequest (
	$contact: String!
) {
	deleteFriendRequest (
		otherUser: $contact
	) {
		ok
	}
}
`

export const sendRequestMutation = gql`
mutation sendFriendRequest (
	$contact: String!
) {
	sendFriendRequest (
		contactReceiver: $contact
	) {
		ok
		message
	}
}
`

export const getFriendsQuery = gql`
query user {
	user {
		user {
			friend {
				contact
				firstName
			}
		}
	}
}
`