import React, { Component } from 'react'
import request from './../async/request'

const Child = props => (
  <div>
    <input id="click" onClick={props.childOnClick}>Child</input>
    <input id="async-click" onClick={props.requestOnClick}>Child</input>
  </div>
)

export default class Parent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      childValue: false,
      asyncResponse: ''
    }
  }

  request = async () => {
    const response = await request('mojo')

    this.setState({ asyncResponse: response })
  }

  childOnClick = () => {
    this.setState({ childValue: true })
  }

  render() {
    return(
      <div>
        <Child childOnClick={this.childOnClick} requestOnClick={this.request} />
      </div>
    )
  }
}
