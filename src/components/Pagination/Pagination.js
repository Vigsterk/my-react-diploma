import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  constructor(props) {
    super(props)
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
    let item = this.props.page
    item > 0 ? item-- : item = 1
    let change = item
    console.log("Страница--", change)
    this.state.changePage(change)
  }


  ForwardButton = event => {
    let item = this.props.page
    item < this.state.pagesArr.length ? item++ : item = this.state.pagesArr.length
    let change = item
    console.log("Страница++", change)
    this.state.changePage(change)
  }
  ChangeEvent = event => {
    console.log(event.target)
    let link
    if (link.className === 'pagination-li ') {
      link.classList.remove('pagination-li-active');
    } else {
      if (document.querySelector('.pagination-li-active')) {
        document.querySelector('.pagination-li-active').classList.toggle('pagination-li-active');

      }
      link.classList.toggle('pagination-li-active');
    }

  }


  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><button className="angle-back_button" onClick={this.BackButton} /></div>
          <ul className="pagination-ul">
            {this.state.pagesArr && this.state.pagesArr.map((item, index) => <li key={index} className="pagination-li pagination-li-active"><a className="pagination-link" href="" onClick={this.ChangeEvent}>{item}</a></li>)}
          </ul>
          <div className="angle-forward"><button className="angle-forward_button" onClick={this.ForwardButton} /></div>
        </div>
      </div>
    )
  }
}


export default Pagination
