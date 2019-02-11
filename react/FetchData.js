import React, { Component } from 'react'
import axios from 'axios'

// implmenting the function as children pattern

// Possible usage examples:

// <FetchData url="www.someAPI.com">
//  { data => <p>data</p> }
// </FetchData>

// <FetchData url="www.someAPI.com">
//  { data => <section>data</section> }
// </FetchData>

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
      <React.Fragment>
        { this.props.children(this.state.data) }
      </React.Fragment>
    )
  }
}