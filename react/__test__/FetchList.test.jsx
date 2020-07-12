import React from 'react'
import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FetchList from '../FetchList'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows nothing on render', () => {
	render(<FetchList />)

	expect(screen.getByText('Nothing')).toBeInTheDocument()
	expect(screen.queryByText('Data')).not.toBeInTheDocument()
	expect(screen.queryByText('Error')).not.toBeInTheDocument()
})

test('shows data when clicked on fetch', async () => {
	server.use(
		rest.get('/hello_word', (req, res, ctx) => {
			return res(ctx.json({ data: 'Data' }))
		})
	)
	render(<FetchList />)

	userEvent.click(screen.getByRole('button'))

	await waitFor(() => {
		expect(screen.queryByText('Nothing')).not.toBeInTheDocument()
		expect(screen.getByText('Data')).toBeInTheDocument()
		expect(screen.queryByText('Error')).not.toBeInTheDocument()
	})
})

test('shows error when there is a fetch error', async () => {
	server.use(
		rest.get('/hello_word', (req, res, ctx) => {
			return res(ctx.status(500))
		})
	)
	render(<FetchList />)

	userEvent.click(screen.getByRole('button'))

	await waitFor(() => {
		expect(screen.queryByText('Nothing')).toBeInTheDocument()
		expect(screen.queryByText('Data')).not.toBeInTheDocument()
		expect(screen.getByText('Error')).toBeInTheDocument()
	})
})
