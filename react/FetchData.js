import React, { Component } from 'react'
import axios from 'axios'

export default class FetchData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount = async () =>{
    const url = this.props.url
    const params = { fakeId: 1, fakeQuery: 'abc' }
    const { data } = await axios.get(url, params)

    this.setState({ data })
  }

  render() {
    return(
      <div></div>
    )
  }
}