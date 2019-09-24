import React, { Fragment, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Helmet from "react-helmet";

import Header from "../src/containers/header";
import Landing from "../src/containers/landing";

const Routes = () => (
  <Fragment>
    <Helmet
      htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
      title="Tami | Сайты на заказ любой сложности"
      titleTemplate="Tami | Сайты на заказ любой сложности"
      defaultTitle="Tami | Сайты на заказ любой сложности"
      link={[{ rel: "icon", type: "image/png", href: "images/favicon.png" }]}
      meta={[
        { name: "description", content: "Helmet application" },
        { property: "fb:app_id", content: "myfbid" },
        {
          property: "og:title",
          content: "Tami | Сайты на заказ любой сложности"
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://tami.kz/" },
        { property: "og:image", content: "https://tami.kz/favicon.png" },
        { property: "icon", content: "https://tami.kz/favicon.png" },
        {
          property: "og:description",
          content:
            "Tami kz сайты на заказ. Landing page от 49 990тг , Корпаративные от 139 990тг , КАТАЛОГ от 199 990тг, ИНТЕРНЕТ-МАГАЗИН от 249 990тг,ИНДИВИДУАЛЬНЫЙ от 499 990тг . Мы — студия дизайна Tami, расположенная в Алмате. Создаем функциональные и удобные, блистательные и легкие сайты для замечательных людей со всего света.Функ­ци­ональ­ность столь же важ­на для нас, как и эс­те­ти­ка. Так бы­ло всег­да: счи­та­ем, что по­иск прос­то­ты и яс­нос­ти тре­бу­ет вре­ме­ни, что струк­ту­ри­ро­ван­ный под­ход в со­че­та­нии со стрем­ле­ни­ем к уни­каль­ным и не­ожи­дан­ным ре­ше­ни­ям по­мо­гут на­шим кли­ен­там тес­нее спло­тить­ся со сво­ей ауди­то­ри­ей, рас­ши­рить её и ос­та­вать­ся пе­ре­до­вы­ми в стре­ми­тель­но раз­ви­ва­ющем­ся циф­ро­вом ми­ре."
        },
        {
          property: "description",
          content:
            "Tami kz сайты на заказ. Landing page от 49 990тг , Корпаративные от 139 990тг , КАТАЛОГ от 199 990тг, ИНТЕРНЕТ-МАГАЗИН от 249 990тг,ИНДИВИДУАЛЬНЫЙ от 499 990тг . Мы — студия дизайна Tami, расположенная в Алмате. Создаем функциональные и удобные, блистательные и легкие сайты для замечательных людей со всего света.Функ­ци­ональ­ность столь же важ­на для нас, как и эс­те­ти­ка. Так бы­ло всег­да: счи­та­ем, что по­иск прос­то­ты и яс­нос­ти тре­бу­ет вре­ме­ни, что струк­ту­ри­ро­ван­ный под­ход в со­че­та­нии со стрем­ле­ни­ем к уни­каль­ным и не­ожи­дан­ным ре­ше­ни­ям по­мо­гут на­шим кли­ен­там тес­нее спло­тить­ся со сво­ей ауди­то­ри­ей, рас­ши­рить её и ос­та­вать­ся пе­ре­до­вы­ми в стре­ми­тель­но раз­ви­ва­ющем­ся циф­ро­вом ми­ре."
        },
        { property: "og:site_name", content: "tami.kz" }
      ]}
    />
    <Route component={Header} />
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  </Fragment>
);

export default Routes;
