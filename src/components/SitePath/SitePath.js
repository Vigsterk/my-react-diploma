import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SitePath extends Component {
  render() {
    console.log(this.props)
    const { filterParamFunc, filterParam } = this.props
    const activeCategory = filterParam ? filterParam.activeCategory : null
    return (
      <div className="site-path">
        <ul className="site-path__items">
          {this.props.pathprops.map(item =>
            <li key={item.title} className="site-path__item"><Link to={item.to} onClick={activeCategory && filterParamFunc({ activeCategory })}>{item.title}</Link></li>
          )}
        </ul>
      </div>
    )
  }
}
export default SitePath