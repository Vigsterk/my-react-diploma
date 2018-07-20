import React from 'react';
import { NavLink } from 'react-router-dom'

const SitePath = (props) => {
  const pathArr = props.pathprops
  return (
    <div className="site-path">
      <ul className="site-path__items">
        {pathArr.map(item =>
          <li className="site-path__item"><NavLink to={item.to}>{item.title}</NavLink></li>
        )}
      </ul>
    </div>
  )
}
export default SitePath