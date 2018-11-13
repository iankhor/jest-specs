import React, { Component } from 'react'
import request from './../async/request'

const Child = props => (
  <div>
    <input id="child-click" onClick={props.childOnClick}>Child</input>
    <input id="child-async-click" onClick={props.requestOnClick}>Child</input>
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
        <input id="click" onClick={this.props.someFunction}></input>
        <Child childOnClick={this.childOnClick} requestOnClick={this.request} />
      </div>
    )
  }
}
