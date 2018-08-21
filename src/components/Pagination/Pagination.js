import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changePage: this.props.func,
      pagesArr: this.getPages(),
      activeIndex: 0
    }
  }

  getPages = () => {
    let arrItems = []
    for (var i = 1; i < this.props.pages + 1 && i < 6; i++) {
      arrItems.push(i)
    }
    return arrItems
  }

  componentDidUpdate(prevProps) {
    if (this.props.pages !== prevProps.pages) {
      this.setState({
        pagesArr: this.getPages(this.props.pages)
      })
    }
  }

  backButton = event => {
    let item = this.props.page
    item > 1 ? item-- : item = 1
    this.state.changePage(item)
    if (this.state.pagesArr.length > 5 && item === this.state.pagesArr.length - 2) {
      let tempArr = [...this.state.pagesArr].splice(-1)
      this.setState({
        pagesArr: tempArr,
      })
    }
    this.setState({
      activeIndex: item - 1
    })
  }

  forwardButton = event => {
    let item = this.props.page
    item++
    this.state.changePage(item)
    if (this.state.pagesArr.length > 4 && item === this.state.pagesArr.length) {
      let pageAdd = this.state.pagesArr.length + 1
      this.setState({
        pagesArr: this.state.pagesArr.concat(pageAdd),
      })
    }
    this.setState({
      activeIndex: item - 1
    })
  }

  changeEvent = index => {
    this.setState({
      activeIndex: index
    })
    this.state.changePage(index + 1)
  }

  handleClick = () => this.changeEvent(this.state.pagesArr.length - 1)

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><button className="angle-back_button" onClick={this.backButton} /></div>
          <ul className="pagination-ul">
            {this.state.pagesArr.map((item, index) => <ListItem key={index}
              isActive={this.state.activeIndex === index}
              idx={index}
              func={this.changeEvent}
              item={item}
            />)}
            <li className="disable-pagination-li">...</li>
            <li className="disable-pagination-li"><button className="pagination-page" onClick={this.handleClick}>{this.state.pagesArr.length}</button></li>
          </ul>
          <div className="angle-forward"><button className="angle-forward_button" onClick={this.forwardButton} /></div>
        </div>
      </div>
    )
  }
}

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx)
  render() {
    return (
      <li className={this.props.isActive ? 'pagination-li pagination-li-active' : 'pagination-li'}>
        <button className="pagination-page" onClick={this.handleClick}>{this.props.item}</button>
      </li>
    )
  }
}

export default Pagination
