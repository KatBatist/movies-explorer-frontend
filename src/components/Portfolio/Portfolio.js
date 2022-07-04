import React from 'react';
import SubTitleSection from '../SubTitleSection/SubTitleSection';
import List from '../List/List';

function Portfolio() {

  const portfolioList = [
    {
      key: "1",
      text: "Статичный сайт",
      link: "https://github.com/KatBatist/how-to-learn",
      span: "↗",
      classNameItem: "portfolio__item",
      classNameLink: "portfolio__link",
      classNameSpan: "portfolio__span",
    },
    {
      key: "2",
      text: "Адаптивный сайт",
      link: "https://github.com/KatBatist/russian-travel",
      span: "↗",
      classNameItem: "portfolio__item",
      classNameLink: "portfolio__link",
      classNameSpan: "portfolio__span",
    },
    {
      key: "3",
      text: "Одностраничное приложение",
      link: "https://github.com/KatBatist/react-mesto-api-full",
      span: "↗",
      classNameItem: "portfolio__item",
      classNameLink: "portfolio__link",
      classNameSpan: "portfolio__span",
    }
  ];

  return (
    <div className="portfolio">
      <SubTitleSection
        text="Портфолио"
        section="portfolio"
      />
      <List
        dataList={portfolioList}
        nameList="portfolio__list"
        typeList="#span"
      />
    </div>
  )
}

export default Portfolio;


