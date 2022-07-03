import React from 'react';
import { Link } from 'react-router-dom';

function List({dataList, nameList, typeList}) {

  const list = dataList.map((item) => (
  (typeList === "link" &&
    (<Link className={item.classNameLink} to={item.link} key={item.key}>
      {item.text}
    </Link>)) ||
    (<li className={item.classNameItem} key={item.key}>
      {(typeList === "li" && item.text) ||
        (typeList === "#" &&
          <a className={item.classNameLink} href={item.link}>{item.text}</a>) ||
          <a className={item.classNameLink} href={item.link} target="_blank" rel="noreferrer">
            {item.text}
            {typeList === "#span" &&
              <span className={item.classNameLink}>{item.span}</span>}
          </a>}
    </li>)
  ));

  return (
    <ul className={nameList}>
      {list}
    </ul>
  )
}

export default List;