import React from 'react';
import HeaderSection from '../HeaderSection/HeaderSection';
import SubTitleSection from '../SubTitleSection/SubTitleSection';
import TextSection from '../TextSection/TextSection';
import Chart from '../Chart/Chart';

function AboutProject() {

  const chartList = [
    {
      key: "1",
      name: "",
      title: "1 неделя",
      text: "Back-end",
    },
    {
      key: "2",
      name: "frontend",
      title: "4 недели",
      text: "Front-end",
    }
  ];

  return (
    <div id="about-project" className="about-project">
      <HeaderSection
        text="О проекте"
      />
      <div className="about-project__container">
        <div className="about-project__container-item">
          <SubTitleSection
            text="Дипломный проект включал 5 этапов"
            section="about-project"
          />
          <TextSection
            text="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
            section="about-project"
          />
        </div>
      <div className="about-project__container-item">
        <SubTitleSection
          text="На выполнение диплома ушло 5 недель"
          section="about-project"
        />
        <TextSection
          text="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
          section="about-project"
        />
        </div>
      </div>
      <Chart
        chartList={chartList}
      />
    </div>
  )
}

export default AboutProject;
