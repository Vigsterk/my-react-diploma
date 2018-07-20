import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Subscribe />
        <FooterWrap />
      </footer>
    )
  }
}

const Subscribe = () => {
  return (
    <section className="subscribe">
      <div className="subscribe__wrapper">
        <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
        <form className="subscribe__radios" action="">
          <label className="subscribe__radio_label">
            <input className="subscribe__radio" type="radio" name="subscribe" value="women" />
            <div className="subscribe__radio_text">Женское</div>
          </label>
          <label className="subscribe__radio_label">
            <input className="subscribe__radio" type="radio" name="subscribe" value="men" />
            <div className="subscribe__radio_text">Мужское</div>
          </label>
          <label className="subscribe__radio_label">
            <input className="subscribe__radio" type="radio" name="subscribe" value="both" />
            <div className="subscribe__radio_text">Всё</div>
          </label>
          <input className="subscribe__email" type="email" placeholder="Ваш e-mail" />
          <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" />
        </form>
      </div>
    </section>
  )
}

const FooterWrap = () => {
  return (
    <div className="footer__bottom">
      <div className="wrapper">
        <div className="footer__menus">
          <div className="footer__menu footer__menu_about">О магазине
              <ul>
              <li><NavLink to="/">BosaNoga</NavLink></li>
              <li><NavLink to="/">Новости</NavLink></li>
              <li><NavLink to="/">Пресса</NavLink></li>
            </ul>
          </div>
          <div className="footer__menu footer__menu_collection">Коллекции
              <ul>
              <li><NavLink to="/">Обувь</NavLink></li>
              <li><NavLink to="/">Аксессуары</NavLink></li>
              <li><NavLink to="/">Для дома</NavLink></li>
            </ul>
          </div>
          <div className="footer__menu footer__menu_help">Помощь
              <ul>
              <li><NavLink to="/">Как купить?</NavLink></li>
              <li><NavLink to="/">Возврат</NavLink></li>
              <li><NavLink to="/">Контакты</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="footer__info">
          <h3 className="footer__info_title">Принимаем к оплате:</h3>
          <div className="footer__paid-systems">
            <div className="footer__paid footer__paid_paypal"></div>
            <div className="footer__paid footer__paid_master-card"></div>
            <div className="footer__paid footer__paid_visa"></div>
            <div className="footer__paid footer__paid_yandex"></div>
            <div className="footer__paid footer__paid_webmoney"></div>
            <div className="footer__paid footer__paid_qiwi"></div>
          </div>
          <div className="footer__social-links">
            <h3 className="footer__social-links_title">Мы в соц.сетях:</h3>
            <div className="footer__social-link footer__social-link_twitter"></div>
            <div className="footer__social-link footer__social-link_vk"></div>
          </div>
          <div className="footer__copyright">2009-2018 © BosaNoga.ru — модный интернет-магазин обуви<br /> и аксессуаров. Все права защищены. Доставка по всей России!</div>
        </div>
        <div className="footer__contacts"><NavLink className="footer__phone" to="tel:+7-495-790-35-03">+7 495 79 03 5 03</NavLink>
          <p className="footer__phone_text">Ежедневно: с 09-00 до 21-00</p><NavLink className="footer__email" to="mailto:office@bosanoga.ru">office@bosanoga.ru</NavLink>
        </div>
      </div>
    </div>
  )
}
export default Footer;