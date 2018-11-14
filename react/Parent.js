import React, { Component } from 'react'
import request from './../async/request'

const Child = props => (
  <div>
    <input id="child-click" onClick={props.childOnClick}>Child 1</input>
    <input id="child-async-click" onClick={props.requestOnClick}>Child 2</input>
    <GrandChild grandChildOnClick={props.grandChildOnClick}/>
  </div>
)

const GrandChild = props => (
  <div>
    <input id="grand-child-click" onClick={() => props.grandChildOnClick(3)}>grandChild</input>
  </div>
)

export { Child, GrandChild }

export default class Parent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      childValue: false,
      grandChildValue: 0,
      asyncResponse: ''
    }
  }

  request = async () => {
    const response = await request('mojo')

    this.setState({ asyncResponse: response })
  }

  childOnClick = () => this.setState({ childValue: true })

  grandChildOnClick = value => {
    this.setState({ grandChildValue: value })
  }

  render() {
    return(
      <div>
        <input id="click" onClick={this.props.someFunction}></input>
        <Child
          childOnClick={this.childOnClick}
          requestOnClick={this.request}
          grandChildOnClick={this.grandChildOnClick}
        />
      </div>
    )
  }
}
