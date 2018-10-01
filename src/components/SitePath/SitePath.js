import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SitePath extends Component {
  handleClick = () => this.props.filterParamFunc(this.props.filterParam)
  render() {
    const pathArr = this.props.pathprops
    return (
      <div className="site-path">
        <ul className="site-path__items">
          {pathArr.map((item, index) =>
            <li key={index} className="site-path__item"><Link to={item.to} onClick={this.handleClick}>{item.title}</Link></li>
          )}
        </ul>
      </div>
    )
  }
}
export default SitePath