import React, { Fragment, Component, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import $ from "jquery";

import "./landing.css";
import axios from "axios";

const mapData = {
  center: [43.2367614, 76.9130467],
  zoom: 12
};

const coordinates = [[43.2367614, 76.9130467]];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencytype: [
        "креативное",
        "нестандартное",
        "опытное",
        "Веселое",
        "смелое"
      ],
      agencyvalue: 0,
      mail: "",
      name: "",
      msg: "",
      isPaused: false,
      priceitem: 1,
      showmodal: false,
      errUser: {
        name: false,
        msg: false,
        email: false
      }
    };

    this.changeMail = this.changeMail.bind(this);
    this.changeMsg = this.changeMsg.bind(this);
    this.changeName = this.changeName.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.changeModal = this.changeModal.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.agencyvalue === prevState.agencytype.length) {
      return {
        agencyvalue: 0
      };
    }
    return {};
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (!this.state.isPaused) {
        this.setState(prevState => ({
          agencyvalue: prevState.agencyvalue + 1
        }));
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({
      agencyvalue: 0
    });
  }

  changeMail(e) {
    this.setState({
      mail: e.target.value
    });

    var err = this.state.errUser;
    err.email = false;
    this.setState({ errUser: err });
  }
  changeName(e) {
    this.setState({
      name: e.target.value
    });

    var err = this.state.errUser;
    err.name = false;
    this.setState({ errUser: err });
  }
  changeMsg(e) {
    this.setState({
      msg: e.target.value
    });

    var err = this.state.errUser;
    err.msg = false;
    this.setState({ errUser: err });
  }

  sendMail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      this.state.msg.length > 8 &&
      this.state.name.length > 1 &&
      re.test(this.state.mail)
    ) {
      axios
        .post(`/sendmail/`, {
          name: this.state.name,
          mail: this.state.mail,
          msg: this.state.msg
        })
        .then(response => {
          this.setState({ showmodal: true, name: "", mail: "", msg: "" });
        })
        .catch(err => {});
    } else {
      var err = this.state.errUser;

      if (this.state.name.length < 2) {
        err.name = true;
      }

      if (this.state.msg.length < 9) {
        err.msg = true;
      }

      if (!re.test(this.state.mail)) {
        err.email = true;
      }

      this.setState({ errUser: err });
    }
  }

  changeModal(type) {
    this.setState({ showmodal: type });
  }

  render() {
    var self = this;
    $(document).ready(function() {
      $(".main-title-info").hover(
        () => {
          $(".bg-video").css("opacity", "1");
          self.setState({ isPaused: true });
        },
        () => {
          $(".bg-video").css("opacity", "0");
          self.setState({ isPaused: false });
        }
      );
    });

    return (
      <Fragment>
        <div className="landing">
          <div className="main">
            <div className="bg-main">
              <div />
            </div>
            <div className="opacity-main" />
            <div className="bg-video">
              <video loop autoPlay muted controls={false}>
                <source src="./images/back.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="container">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div className="main-body">
                    <div className="main-title">мы</div>
                    <div className="main-title-info">
                      {this.state.agencytype[this.state.agencyvalue]}
                    </div>
                    <div className="main-subtitle">
                      агентство по продвижению <br /> вашего бизнеса <br /> в
                      интернете
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* about */}
          <div className="about">
            <div className="bg-about">
              <div />
            </div>
            <div className="container">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div
                    className="about-body"
                    data-uk-parallax="opacity: 0,1; y: 100,0; viewport: 0.5"
                  >
                    <div className="about-title">О нас</div>
                    <div className="about-info">
                      Мы — студия разработки и дизайна Tami, расположенная в
                      Алматы. Создаём функциональные, удобные и современные
                      сайты для вас.
                      <br /> <br />
                      Функ­ци­ональ­ность столь же важ­на для нас, как и
                      эс­те­ти­ка. Так бы­ло всег­да: счи­та­ем, что по­иск
                      прос­то­ты и яс­нос­ти тре­бу­ет вре­ме­ни, что
                      струк­ту­ри­ро­ван­ный под­ход в со­че­та­нии со
                      стрем­ле­ни­ем к уни­каль­ным и не­ожи­дан­ным ре­ше­ни­ям
                      по­мо­гут на­шим кли­ен­там тес­нее спло­тить­ся со сво­ей
                      ауди­то­ри­ей, рас­ши­рить её и ос­та­вать­ся
                      пе­ре­до­вы­ми в стре­ми­тель­но раз­ви­ва­ющем­ся
                      циф­ро­вом ми­ре.
                      <br />
                      <br /> Бу­ду­чи парт­не­ра­ми, в пря­мом смыс­ле это­го
                      сло­ва, мы вы­со­ко це­ним сот­руд­ни­чест­во с
                      брен­да­ми, ко­то­рые по­ни­ма­ют важ­ность
                      ин­вес­ти­ро­ва­ния в ди­зайн.
                    </div>
                    <div className="about-cases">
                      <div className="about-case">
                        <h4>3</h4>
                        <h5>года на рынке</h5>
                      </div>
                      <div className="about-case">
                        <h4>20+</h4>
                        <h5>Выполненых проектов</h5>
                      </div>
                      <div className="about-case">
                        <h4>12</h4>
                        <h5>профессионалов в команде</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* about end */}
          {/* we do */}
          <div className="wedo">
            <div className="bg-wedo">
              <div />
            </div>
            <div className="opacity-wedo" />
            <div className="container">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div
                    className="wedo-body"
                    data-uk-parallax="opacity: 0,1; y: 100,0; viewport: 0.5"
                  >
                    <div className="wedo-title">Что мы делаем</div>
                    <div className="wedo-cards">
                      <div className="wedo-card">
                        <div className="wedo-card-num">1</div>
                        <div className="wedo-card-title">Дизайн</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">UI & UX Дизайн</div>
                          <div className="wedo-card-info-i">Илюстрации</div>
                          <div className="wedo-card-info-i">Дизайн лого</div>
                        </div>
                      </div>
                      <div className="wedo-card">
                        <div className="wedo-card-num">2</div>
                        <div className="wedo-card-title">Разработка</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">Landing</div>
                          <div className="wedo-card-info-i">Корпаративный</div>
                          <div className="wedo-card-info-i">Проект</div>
                        </div>
                      </div>
                      <div className="wedo-card">
                        <div className="wedo-card-num">3</div>
                        <div className="wedo-card-title">Анимации</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">Motion дизайн</div>
                          <div className="wedo-card-info-i">
                            Интеракивные протатипы
                          </div>
                          <div className="wedo-card-info-i">UI анимации</div>
                        </div>
                      </div>
                      <div className="wedo-card">
                        <div className="wedo-card-num">4</div>
                        <div className="wedo-card-title">Менеджмент</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">
                            Управление проектом
                          </div>
                          <div className="wedo-card-info-i">
                            Поддержка проекта
                          </div>
                          <div className="wedo-card-info-i">
                            Управление контентом
                          </div>
                        </div>
                      </div>
                      <div className="wedo-card">
                        <div className="wedo-card-num">5</div>
                        <div className="wedo-card-title">Маркетинг</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">Google Adwords</div>
                          <div className="wedo-card-info-i">Яндекс Директ</div>
                          <div className="wedo-card-info-i">
                            Разработка контента
                          </div>
                        </div>
                      </div>
                      <div className="wedo-card">
                        <div className="wedo-card-num">6</div>
                        <div className="wedo-card-title">Сервисы</div>
                        <div className="wedo-card-info">
                          <div className="wedo-card-info-i">Почта</div>
                          <div className="wedo-card-info-i">
                            Онлайн транзакции
                          </div>
                          <div className="wedo-card-info-i">SMS рассылки</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end we do */}

          <div className="price">
            <div className="bg-price">
              <div />
            </div>
            <div className="container">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div
                    className="price-body"
                    data-uk-parallax="opacity: 0,1; y: 100,0; viewport: 0.5"
                  >
                    <div className="price-title">
                      <div className="price-title-main">Цены</div>
                      {/* <div className="price-block-titles">
                        <div>Разработка сайтов</div>
                        <div>Продвижение </div>
                        <div>Тех подержка</div>
                      </div> */}
                    </div>
                    <div className="price__content">
                      <div className="price-main">
                        <div className="price-block">
                          <div className="price-info">
                            {this.state.priceitem === 1 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">
                                  Landing Page
                                </div>
                                <div className="price-info-num">
                                  от 59 990тг
                                </div>
                                <div className="price-info-text">
                                  Веб-страница содержащая информацию об услуге
                                  или товаре, задача которой — продавать,
                                  продавать и ещё раз продавать.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Слайд-шоу</li>
                                  <li>Карта проезда</li>
                                  <li>Хостинг и домен</li>
                                </ul>
                              </div>
                            ) : null}
                            {this.state.priceitem === 2 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">Визитка</div>
                                <div className="price-info-num">
                                  от 49 990тг
                                </div>
                                <div className="price-info-text">
                                  1–10 страниц в интернете, которые полностью
                                  описывают основную информацию о вас,
                                  предлагаемых услугах и способах связи с вами.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>До 5 страниц</li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Слайд-шоу</li>
                                  <li>Карта проезда</li>
                                  <li>Хостинг и домен</li>
                                </ul>
                              </div>
                            ) : null}
                            {this.state.priceitem === 3 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">
                                  Корпаративные
                                </div>
                                <div className="price-info-num">
                                  от 139 990тг
                                </div>
                                <div className="price-info-text">
                                  Фирменный коммерческий сайт компаний.
                                  Оптимальное решение для всех компаний, которые
                                  хотят стать лидерами в своей сфере бизнеса.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>Фотогалерея, новости, статьи</li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Слайд-шоу</li>
                                  <li>Карта проезда</li>
                                  <li>Хостинг и домен</li>
                                </ul>
                              </div>
                            ) : null}
                            {this.state.priceitem === 4 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">Каталог</div>
                                <div className="price-info-num">
                                  от 199 990тг
                                </div>
                                <div className="price-info-text">
                                  Если Вы желаете полностью предоставить
                                  потенциальным клиентам информацию о своей
                                  продукции.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>Фотогалерея, новости, статьи</li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Слайд-шоу</li>
                                  <li>Заполнение товаров </li>
                                  <li>Карта проезда</li>
                                  <li>Хостинг и домен</li>
                                </ul>
                              </div>
                            ) : null}
                            {this.state.priceitem === 5 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">
                                  Интернет-магазин
                                </div>
                                <div className="price-info-num">
                                  от 249 990тг
                                </div>
                                <div className="price-info-text">
                                  Содержит эффективные механизмы для
                                  представления и продажи товаров и услуг в
                                  интернете.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>Фотогалерея, новости, статьи</li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Слайд-шоу</li>
                                  <li>Заполнение товаров </li>
                                  <li>Карта проезда</li>
                                  <li>Хостинг и домен</li>
                                  <li>Онлайн транзакции</li>
                                  <li>Бот чат</li>
                                </ul>
                              </div>
                            ) : null}
                            {this.state.priceitem === 6 ? (
                              <div className="price-info-i">
                                <div className="price-info-title">
                                  Индивидуальный
                                </div>
                                <div className="price-info-num">
                                  от 499 990тг
                                </div>
                                <div className="price-info-text">
                                  Работаем по вашему техническому заданию, чтобы
                                  сайт соответствовал всем требованиям.
                                </div>
                                <ul className="price-info-list">
                                  <li>Мобильная версия</li>
                                  <li>СRM</li>
                                  <li>Сложный функционал</li>
                                  <li>
                                    Регистрация в поисковых системах Google и
                                    Яндекс
                                  </li>
                                  <li>Фотогалерея, новости, статьи</li>
                                  <li>Online-форма собирающая контакты</li>
                                  <li>Хостинг и домен</li>
                                  <li>Онлайн транзакции</li>
                                </ul>
                              </div>
                            ) : null}
                          </div>
                          <div className="price-cards">
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 1 })
                              }
                            >
                              <div className="price-card-name">
                                Landing-page
                              </div>
                              <div className="price-card-info">
                                Веб-страница содержащая информацию об услуге или
                                товаре, задача которой — продавать, продавать и
                                ещё раз продавать.
                              </div>
                              <div className="price-card-num">от 59 990тг</div>
                            </div>
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 2 })
                              }
                            >
                              <div className="price-card-name">Визитка</div>
                              <div className="price-card-info">
                                1–10 страниц в интернете, которые полностью
                                описывают основную информацию о вас,
                                предлагаемых услугах и способах связи с вами.
                              </div>
                              <div className="price-card-num">от 49 990тг</div>
                            </div>
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 3 })
                              }
                            >
                              <div className="price-card-name">
                                КОРПОРАТИВНЫЕ
                              </div>
                              <div className="price-card-info">
                                Фирменный коммерческий сайт компаний.
                                Оптимальное решение для всех компаний, которые
                                хотят стать лидерами в своей сфере бизнеса.
                              </div>
                              <div className="price-card-num">от 139 990тг</div>
                            </div>
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 4 })
                              }
                            >
                              <div className="price-card-name">КАТАЛОГ</div>
                              <div className="price-card-info">
                                Если Вы желаете полностью предоставить
                                потенциальным клиентам информацию о своей
                                продукции.
                              </div>
                              <div className="price-card-num">от 199 990тг</div>
                            </div>
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 5 })
                              }
                            >
                              <div className="price-card-name">
                                ИНТЕРНЕТ-МАГАЗИН
                              </div>
                              <div className="price-card-info">
                                Содержит эффективные механизмы для представления
                                и продажи товаров и услуг в интернете.
                              </div>
                              <div className="price-card-num">от 249 990тг</div>
                            </div>
                            <div
                              className="price-card"
                              onMouseOver={() =>
                                this.setState({ priceitem: 6 })
                              }
                            >
                              <div className="price-card-name">
                                ИНДИВИДУАЛЬНЫЙ
                              </div>
                              <div className="price-card-info">
                                Работаем по вашему техническому заданию, чтобы
                                сайт соответствовал всем требованиям.
                              </div>
                              <div className="price-card-num">от 499 990тг</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* how */}
          <div className="how">
            <div className="bg-how">
              <div />
            </div>
            <div className="container">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div
                    className="how-body"
                    data-uk-parallax="opacity: 0,1; y: 100,0; viewport: 0.5"
                  >
                    <div data-tabindex="-1" data-uk-slider="finite:true">
                      <div className="how-title">
                        <div className="how-title-text">Как мы работаем</div>
                        <div className="how-title-arrays">
                          <a
                            href="#"
                            data-uk-slidenav-previous
                            data-uk-slider-item="previous"
                            className="how-arrays"
                          >
                            <span uk-icon="icon:  chevron-left;ratio: 2" />
                          </a>
                          <a
                            href="#"
                            data-uk-slidenav-next
                            data-uk-slider-item="next"
                            className="how-arrays"
                          >
                            <span uk-icon="icon:  chevron-right;ratio: 2" />
                          </a>
                        </div>
                      </div>
                      <div className="how-cards uk-slider-items">
                        <div className="how-card">
                          <div className="how-card-inner">
                            <div className="how-card-num">1</div>
                            <div className="how-card-title">
                              Определение задачи
                            </div>
                            <div className="how-card-info">
                              Никто не знает ваш бизнес лучше вас. Так что мы
                              уделим немного времени на изучение вас и вашего
                              проекта.Затем мы установим конкретные цели, чтобы
                              помочь определить ваш успех
                            </div>
                            <div className="how-card-list">
                              <div className="how-card-list-i">
                                Установка задач
                              </div>
                              <div className="how-card-list-i">
                                Изучение аудитории
                              </div>
                              <div className="how-card-list-i">
                                Определить ваше видение
                              </div>
                              <div className="how-card-list-i">
                                Уникальность проекта
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="how-card">
                          <div className="how-card-inner">
                            <div className="how-card-num">2</div>
                            <div className="how-card-title">План</div>
                            <div className="how-card-info">
                              Давайте разберемся, куда вы хотите пойти и как
                              туда добраться. Мы планируем в соответствии с
                              вашим бюджетом и временными рамками,
                              бизнес-моделью и сроками.
                            </div>
                            <div className="how-card-list">
                              <div className="how-card-list-i">
                                Временные сроки
                              </div>
                              <div className="how-card-list-i">
                                План проекта
                              </div>
                              <div className="how-card-list-i">
                                Первые прототипы
                              </div>
                              <div className="how-card-list-i">
                                Построение направлыения
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="how-card">
                          <div className="how-card-inner">
                            <div className="how-card-num">3</div>
                            <div className="how-card-title">Изучение</div>
                            <div className="how-card-info">
                              Это самая веселая часть. Это то место, где мы
                              исчезаем, чтобы придумывать, создавать, писать и
                              иногда плакать.
                            </div>
                            <div className="how-card-list">
                              <div className="how-card-list-i">
                                Генерация концепций
                              </div>
                              <div className="how-card-list-i">
                                Создание концепта
                              </div>
                              <div className="how-card-list-i">
                                Исследование дизайна
                              </div>
                              <div className="how-card-list-i">
                                Уточнение направления
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="how-card">
                          <div className="how-card-inner">
                            <div className="how-card-num">4</div>
                            <div className="how-card-title">Создание</div>
                            <div className="how-card-info">
                              Это где мы делаем вещь. Мы будем воплощать идеи и
                              тактику, которые мы намереваемся реализовать.
                            </div>
                            <div className="how-card-list">
                              <div className="how-card-list-i">Разработка</div>
                              <div className="how-card-list-i">
                                Создание контента
                              </div>
                              <div className="how-card-list-i">
                                Реализация результатов
                              </div>
                              <div className="how-card-list-i">
                                Внесение изменений
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="how-card">
                          <div className="how-card-inner">
                            <div className="how-card-num">5</div>
                            <div className="how-card-title">
                              Доставить и запустить
                            </div>
                            <div className="how-card-info">
                              После окончательного тестирования продукта, и как
                              только все согласны, мы запускаем!
                            </div>
                            <div className="how-card-list">
                              <div className="how-card-list-i">
                                Тестирование
                              </div>
                              <div className="how-card-list-i">SEO</div>
                              <div className="how-card-list-i">Настройка</div>
                              <div className="how-card-list-i">Хостинг</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end how */}
          {/* contact */}
          <div className="contact">
            <div className="bg-contact">
              <div />
            </div>
            <div className="con-container ">
              <div className="landing__layout">
                <div className="landing-devider" />
                <div className="landing__content">
                  <div className="contact-body">
                    <div className="contact-content">
                      <div className="contact-title">Контакты</div>
                      <div className="contact-list">
                        <div className="contact-email">
                          <a target="_blank" href="mailto:hello@tami.kz">
                            hello@tami.kz
                          </a>
                        </div>
                        <div className="contact-phone">
                          <a target="_blank" href="tel:+77071108232">
                            +7(707)110-82-32
                          </a>
                        </div>
                        <div className="contact-phone">
                          <a>БЦ Almaty Towers, Байзакова, 280</a>
                        </div>
                        <div className="contact-form">
                          <div className="form-title">Let's work</div>
                          <form className="form">
                            <input
                              type="text"
                              placeholder="Имя"
                              value={this.state.name}
                              onChange={this.changeName}
                            />
                            {this.state.errUser.name ? (
                              <div className="form-error">
                                Введите правельное имя
                              </div>
                            ) : (
                              <div className="form-error" />
                            )}
                            <input
                              type="text"
                              placeholder="Почта"
                              value={this.state.mail}
                              onChange={this.changeMail}
                            />
                            {this.state.errUser.email ? (
                              <div className="form-error">
                                Введите правельную почту
                              </div>
                            ) : (
                              <div className="form-error" />
                            )}
                            <textarea
                              value={this.state.msg}
                              onChange={this.changeMsg}
                              name=""
                              id=""
                              cols="30"
                              rows="5"
                              placeholder="Ваш вопрос"
                            />
                            {this.state.errUser.msg ? (
                              <div className="form-error">
                                Введите правельное сообщение
                              </div>
                            ) : (
                              <div className="form-error" />
                            )}
                            <div className="button" onClick={this.sendMail}>
                              отправить
                            </div>
                            {this.state.showmodal ? (
                              <div className="contact-modal">
                                <div
                                  className="contact-modal-bg"
                                  onClick={() => this.changeModal(false)}
                                />
                                <div className="contact-modal-body">
                                  <div
                                    className="contact-modal-close"
                                    onClick={() => this.changeModal(false)}
                                  >
                                    <img src="images/close.svg" alt="" />
                                  </div>
                                  <div className="contact-modal-title">
                                    Спасибо, за заявку
                                  </div>
                                  <div className="contact-modal-text">
                                    Мы вам ответим в течение некоторого времени
                                  </div>
                                  x
                                </div>
                              </div>
                            ) : null}
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="contact-map">
                      <YMaps>
                        <Map defaultState={mapData} width="100%" height="100%">
                          {coordinates.map((coordinate, key) => (
                            <Placemark key={key} geometry={coordinate} />
                          ))}
                        </Map>
                      </YMaps>
                    </div>
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

export default connect(mapStateToProps)(Main);
