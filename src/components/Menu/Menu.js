import React from 'react';
import Popup from '../Popup/Popup';
import { Link } from 'react-router-dom';
import Account from '../Account/Account';

function Menu({isOpen, onClose}) {

  const menuList = [
    {
      key: "1",
      text: "Главная",
      link: "/",
      type: ""
    },
    {
      key: "2",
      text: "Фильмы",
      link: "/movies",
      type: "under"
    },
    {
      key: "3",
      text: "Сохранённые фильмы",
      link: "/saved-movies",
      type: ""
    },
  ];

  const list = menuList.map((item) => (
    <Link
      key={item.key}
      className={`menu__link menu__link_${item.type}`}
      to={item.link}
      onClick={onClose}
    >
      {item.text}
    </Link>
  ));

  return (
    <Popup
      name="menu"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <ul className="menu__container">
          {list}
          <Account
            onClose={onClose}
            type="menu"
          />
        </ul>
      </div>
    </Popup>
  )
}

export default Menu;
