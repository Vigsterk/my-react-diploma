import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    let arrItems = []
    for (var i = 1; i < this.props.pages + 1; i++) {
      arrItems.push(i)
    }
    this.state = {
      page: this.props.page,
      pages: this.props.pages,
      changePage: this.props.func,
      pagesArr: arrItems
    }
  }

  BackButton = event => {
    console.log("b")
    console.log("Текущая страница на момент клика", this.props.page)
    let item = this.props.page
    item--
    //item > 0 ? item-- : item = 1
    let change = item
    console.log("Страница--",change)
    this.state.changePage(change)
  }


  ForwardButton = event => {
    console.log("f")
    console.log("Текущая страница на момент клика", this.props.page)
    let item = this.props.page
    item++
    //item < this.state.pagesArr.length ? item++ : item = this.state.pagesArr.length
    let change = item
    console.log("Страница++",change)
    this.state.changePage(change)
  }


  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><button className="angle-back_button" onClick={this.BackButton} /></div>
          <ul>
            {this.state.pagesArr && this.state.pagesArr.map((item, index) => <li key={index}><NavLink to={`/${item}`}>{item}</NavLink></li>)}
          </ul>
          <div className="angle-forward"><button className="angle-forward_button" onClick={this.ForwardButton} /></div>
        </div>
      </div>
    )
  }
}


export default Pagination
