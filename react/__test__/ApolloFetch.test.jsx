import React from 'react'
import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApolloFetch, { client } from '../ApolloFetch'
import { ApolloProvider } from '@apollo/react-hooks'

import { graphql } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows nothing on render', () => {
	render(
		<ApolloProvider client={client}>
			<ApolloFetch />
		</ApolloProvider>
	)

	expect(screen.getByText('Nothing')).toBeInTheDocument()
	expect(screen.queryByText('Loading')).not.toBeInTheDocument()
})

test('shows data when clicked on fetch', async () => {
	server.use(
		graphql.query('User', (req, res, ctx) => {
			return res(
				ctx.data({
					user: {
						__typename: 'User',
						name: 'jason',
					},
				})
			)
		})
	)

	render(
		<ApolloProvider client={client}>
			<ApolloFetch />
		</ApolloProvider>
	)

	userEvent.click(screen.getByRole('button'))

	await waitFor(() => {
		expect(screen.getByText('Loading')).toBeInTheDocument()
		expect(screen.getByText('Nothing')).toBeInTheDocument()
	})

	await waitFor(() => {
		expect(screen.queryByText('Loading')).not.toBeInTheDocument()
		expect(screen.queryByText('Nothing')).not.toBeInTheDocument()
		expect(screen.getByText('jason')).toBeInTheDocument()
	})
})
