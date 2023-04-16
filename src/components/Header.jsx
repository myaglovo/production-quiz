import React from "react";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="container container--header">
        <ul className="header__wrapper">
          <li className="header__item">
            <a href="https://xn--80aamcrokihjjhy7a.xn--p1ai/about">О проекте</a>
          </li>
          <li className="header__item">
            <a href="https://xn--80aamcrokihjjhy7a.xn--p1ai/history">
              Ямальский тыл – фронту
            </a>
          </li>
          <li className="header__logo__wrapper">
            <a href="https://xn--80aamcrokihjjhy7a.xn--p1ai/">
              <img className="header__logo" src={Logo} alt="Логотип" />
            </a>
          </li>
          <li className="header__item">
            <a href="https://xn--80aamcrokihjjhy7a.xn--p1ai/heroes">
              Салехард помнит
            </a>
          </li>
          <li className="header__item">
            <a href="/">Я помню. Я горжусь</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
