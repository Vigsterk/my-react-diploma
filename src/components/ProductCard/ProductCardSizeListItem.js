import React, { Component } from 'react';

class ListItem extends Component {
  handleClick = () => this.props.func(this.props.idx, this.props.size);
  render() {
    return (
      <li className={this.props.isActive ? 'active' : 'not-active'} onClick={this.handleClick}>{this.props.size}</li>
    );
  };
};

export default ListItem;