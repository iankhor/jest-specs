import React, { Component } from 'react'
import axios from 'axios'

// implmenting the render prop pattern

// Possible usage examples:

// <FetchDataRenderProp url="www.someAPI.com" render={ data => <p>data</p>}>
// <FetchDataRenderProp url="www.someAPI.com" render={ data => <section>data</section>}>

export default class FetchDataRenderProp extends Component {
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
        {this.props.render(this.state.data)}
      </React.Fragment>
    )
  }
}