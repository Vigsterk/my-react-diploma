import React, { Component } from 'react';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: 'all',
      email: ''
    };
  };

  onChange = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({
      [name]: value
    });
  };

  submitEmail = (event) => {
    event.preventDefault();
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.state.email.match(reg)) return;
    this.props.subscribed();
  };

  render() {
    const { subscribe, email } = this.state;
    return (
      <form onSubmit={this.submitEmail} className="subscribe__radios" action="">
        <label className="subscribe__radio_label">
          <input
            checked={subscribe === 'female'}
            onChange={this.onChange}
            className="subscribe__radio"
            type="radio"
            name="subscribe"
            value="female"
          />
          <div className="subscribe__radio_text">Женское</div>
        </label>
        <label className="subscribe__radio_label">
          <input
            checked={subscribe === 'male'}
            onChange={this.onChange}
            className="subscribe__radio"
            type="radio"
            name="subscribe"
            value="male"
          />
          <div className="subscribe__radio_text">Мужское</div>
        </label>
        <label className="subscribe__radio_label">
          <input
            checked={subscribe === 'all'}
            onChange={this.onChange}
            className="subscribe__radio"
            type="radio"
            name="subscribe"
            value="all"
          />
          <div className="subscribe__radio_text">Всё</div>
        </label>
        <input
          value={email}
          onChange={this.onChange}
          className="subscribe__email"
          type="email"
          name="email"
          placeholder="Ваш e-mail"
        />
        <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" />
      </form>
    );
  };
};

export default Subscribe;