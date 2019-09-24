import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import $ from "jquery";

import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmenu: false
    };

    this.showMenu = this.showMenu.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  showMenu() {
    if (this.state.showmenu) {
      $(".menu-btn").css("color", "#1e90ff");
      $(".menu-text").css("opacity", "1");
      $(".menu-top").css("transform", "none");
      $(".menu-bottom").css("transform", "none");
      $(".menu").css("left", "-100%");
    } else {
      $(".menu-btn").css("color", "#fff");
      $(".menu-text").css("opacity", "0");
      $(".menu-top").css("transform", "rotate(-45deg)");
      $(".menu-bottom").css(
        "transform",
        "translateY(-0.714285714285714vw) rotate(45deg)"
      );
      $(".menu").css("left", "0");
    }
    this.setState({ showmenu: !this.state.showmenu });
  }

  render() {
    $(document).ready(function() {
      $(".to-main").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".main").offset().top
          },
          1000
        );
      });

      $("#to-about").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".about").offset().top
          },
          1000
        );
      });
      $("#to-wedo").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".wedo").offset().top
          },
          1000
        );
      });
      $("#to-price").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".price").offset().top
          },
          1000
        );
      });
      $("#to-how").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".how").offset().top
          },
          1000
        );
      });
      $("#to-contact").click(function() {
        $("html, body").animate(
          {
            scrollTop: $(".contact").offset().top
          },
          1000
        );
      });
    });

    return (
      <Fragment>
        <div className="header">
          <div className="container">
            <div className="header__content">
              <div className="menu-btn" onClick={this.showMenu}>
                <div className="menu-text">меню</div>
                <div className="menu-top" />
                <div className="menu-bottom" />
              </div>
              <div className="logo">
                tami.kz
                {/* <img src="/images/logo.png" alt="" className="to-main" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="menu">
          <div className="container">
            <div className="menu__content">
              <div className="menu-links">
                <div className="menu-link">
                  <a className="to-main" onClick={this.showMenu}>
                    Главная
                  </a>
                </div>
                <div className="menu-link">
                  <a id="to-about" onClick={this.showMenu}>
                    О нас
                  </a>
                </div>
                <div className="menu-link">
                  <a id="to-wedo" onClick={this.showMenu}>
                    Что мы делаем
                  </a>
                </div>
                <div className="menu-link">
                  <a id="to-price" onClick={this.showMenu}>
                    Цены
                  </a>
                </div>
                <div className="menu-link">
                  <a id="to-how" onClick={this.showMenu}>
                    Как мы работаем
                  </a>
                </div>
                <div className="menu-link">
                  <a id="to-contact" onClick={this.showMenu}>
                    Контакты
                  </a>
                </div>
              </div>
              <div className="menu-contacts">
                <div className="menu-contact">
                  <div className="menu-contact-name">Почта</div>
                  <div className="menu-contact-value">
                    <a href="mailto:hello@tami.kz">hello@tami.kz</a>
                  </div>
                </div>
                <div className="menu-contact">
                  <div className="menu-contact-name">Адрес</div>
                  <div className="menu-contact-value">
                    <a>БЦ Almaty Towers, Байзакова, 280</a>
                  </div>
                </div>
                <div className="menu-contact">
                  <div className="menu-contact-name">Номер телефона</div>
                  <div className="menu-contact-value">
                    <a href="tel:+77071108232">+7(707)110-82-32</a>
                  </div>
                </div>
                <hr className="menu-contact-divider" />
                <div className="menu-contact">
                  <div className="menu-contact-name">Социальные сети</div>
                  <div className="menu-contact-value">
                    <a href="https://www.instagram.com/tami_kz_/?hl=ru">
                      instagram
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=77071108232&text=%D0%97%D0%B4%D1%80%D0%B0%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5">
                      whatsapp
                    </a>
                    <a href="https://t.me/takhirmunarbekov">telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Header);
