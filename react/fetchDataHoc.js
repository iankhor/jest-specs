import React, { Component } from 'react';
import axios from 'axios'

// implmenting an Higher Order Component

// Possible usage examples:

// fetchDataHoc(ListComponent)

const fetchDataHoc = OriginalComponent => {
  return class HOC extends React.Component {
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
      return <OriginalComponent {...this.props} data={this.state.data} />
    }
  }
}

export default fetchDataHoc;