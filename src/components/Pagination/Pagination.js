import React, { Component } from 'react';

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

  componentDidMount() {
    let link = document.querySelector('.pagination-li')
    link.classList.toggle('pagination-li-active');
  }

  BackButton = event => {
    let item = this.props.page
    document.querySelectorAll('.pagination-li')[item - 1].classList.remove('pagination-li-active')
    let link = document.querySelectorAll('.pagination-li')[item - 2]
    link.classList.add('pagination-li-active');
    item > 0 ? item-- : item = 1
    let change = item
    this.state.changePage(change)
  }

  ForwardButton = event => {
    let item = this.props.page
    document.querySelectorAll('.pagination-li')[item - 1].classList.remove('pagination-li-active')
    let link = document.querySelectorAll('.pagination-li')[item]
    link.classList.add('pagination-li-active');
    item < this.state.pagesArr.length ? item++ : item = this.state.pagesArr.length
    let change = item
    this.state.changePage(change)
  }

  ChangeEvent = event => {
    let link = event.target
    let listItem = link.closest("li")
    if (listItem.className === 'pagination-li pagination-li-active') {
      listItem.classList.remove('pagination-li-active')
    } else {
      if (document.querySelector('.pagination-li-active')) {
        document.querySelector('.pagination-li-active').classList.toggle('pagination-li-active');
      }
      listItem.classList.toggle('pagination-li-active');
    }
    this.state.changePage(event.target.textContent)
  }

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><button className="angle-back_button" onClick={this.BackButton} /></div>
          <ul className="pagination-ul">
            {this.state.pagesArr && this.state.pagesArr.map((item, index) => <li key={index} className="pagination-li"><button className="pagination-page" onClick={this.ChangeEvent}>{item}</button></li>)}
            <li className="pagination-li">...</li>
            <li className="pagination-li"><button className="pagination-page" onClick={this.ChangeEvent}>{this.state.pagesArr.length}</button></li>
          </ul>
          <div className="angle-forward"><button className="angle-forward_button" onClick={this.ForwardButton} /></div>
        </div>
      </div>
    )
  }
}

export default Pagination
