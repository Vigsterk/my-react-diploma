import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

const SitePath = (props) => {
  const pathArr = props.pathprops
  return (
    <div className="site-path">
      <ul className="site-path__items">
        {pathArr.map(item =>
          <li className="site-path__item"><NavLink to={item.href}>{item.title}</NavLink></li>
        )}
      </ul>
    </div>
  )
}
export default SitePath