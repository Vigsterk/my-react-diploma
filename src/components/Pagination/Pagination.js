import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props)
    let arrItems = []
    for (var i = 1; i < this.props.pages + 1 && i < 6; i++) {
      arrItems.push(i)
    }
    this.state = {
      page: this.props.page,
      pages: this.props.pages,
      changePage: this.props.func,
      pagesArr: arrItems,
      activeIndex: 0
    }
  }

  BackButton = event => {
    let item = this.props.page
    item > 1 ? item-- : item = 1
    if (this.state.pagesArr.length > 5 && item === this.state.pagesArr.length - 2) {
      let tempArr = [...this.state.pagesArr].splice(-1)
      this.setState({
        pagesArr: tempArr,
        activeIndex: item
      })
    }
    this.state.changePage(item)
  }

  ForwardButton = event => {
    let item = this.props.page
    item++
    if (this.state.pages > 4 && item === this.state.pagesArr.length) {
      let pageAdd = this.state.pagesArr.length + 1
      this.setState({
        pagesArr: this.state.pagesArr.concat(pageAdd),
        activeIndex: item
      })
    }
    this.state.changePage(item)
  }

  ChangeEvent(index) {
    console.log(index)
    this.setState({
      activeIndex: index
    })
    this.state.changePage(index + 1)
  }

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><button className="angle-back_button" onClick={this.BackButton} /></div>
          <ul className="pagination-ul">
            {this.state.pagesArr.map((item, index) => <ListItem key={index}
              isActive={this.state.activeIndex === index}
              onClick={() => this.ChangeEvent(index)}
              item={item}
            />)}
            <li className="disable-pagination-li">...</li>
            <li className="disable-pagination-li"><button className="pagination-page" onClick={this.ChangeEvent}>{this.state.pagesArr.length}</button></li>
          </ul>
          <div className="angle-forward"><button className="angle-forward_button" onClick={this.ForwardButton} /></div>
        </div>
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.onClick(this.props.index)
  render() {
    return (
      <li className={this.props.isActive ? 'pagination-li pagination-li-active' : 'pagination-li'}>
        <button className="pagination-page" onClick={this.handleClick}>{this.props.item}</button>
      </li>
    )
  }
}

export default Pagination
