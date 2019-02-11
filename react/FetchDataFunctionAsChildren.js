import React, { Component } from 'react'
import axios from 'axios'

// implmenting the function as children pattern

// Possible usage examples:

// <FetchDataFunctionAsChildren url="www.someAPI.com">
//  { data => <ShowDataList data={data}> }
// </FetchDataFunctionAsChildren>

// <FetchDataFunctionAsChildren url="www.someAPI.com">
//  { data => <section>data</section> }
// </FetchDataFunctionAsChildren>

export default class FetchDataFunctionAsChildren extends Component {
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