import React, { useState } from 'react'
import axios from 'axios'

const FetchList = () => {
	const [data, setData] = useState('')
	const [error, setError] = useState(false)

	const fetch = async () => {
		try {
			const { data } = await axios.get('/hello_word')

			setData(data.data)
		} catch (e) {
			setError(true)
		}
	}

	return (
		<div>
			<h1>Testing</h1>
			<a role="button" onClick={fetch}>
				Fetch
			</a>
			<div>{data.length ? data : 'Nothing'}</div>
			<div>{error ? 'Error' : ''}</div>
		</div>
	)
}

export default FetchList
