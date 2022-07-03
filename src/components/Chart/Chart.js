import React from 'react';

function Chart({chartList}) {

  const list = chartList.map((item) => (
    <div className={`chart__item chart__item_${item.name}`} key={item.key}>
      <div className={`chart__container chart__container_${item.name}`}>
        <p className="chart__title">{item.title}</p>
      </div>
      <p className="chart__text">{item.text}</p>
    </div>
  ));

  return (

    <div className="chart">
      {list}
    </div>
  )
}

export default Chart;

