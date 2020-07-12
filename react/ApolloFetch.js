import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import ApolloClient from 'apollo-boost'
import fetch from 'unfetch'

export const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql',

	fetch: (...args) => fetch(...args),
})

const GET_USER = gql`
	query User($username: String!) {
		user {
			name
		}
	}
`

const ApolloFetch = () => {
	const [getUser, { loading, data }] = useLazyQuery(GET_USER)

	return (
		<div>
			<button role="button" onClick={getUser}>
				Get User
			</button>

			{loading && <div>Loading</div>}
			{data ? <div>{data.user.name}</div> : <div>Nothing</div>}
		</div>
	)
}

export default ApolloFetch
