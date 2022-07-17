import React from 'react';

function FilterCheckbox({onChange, value}) {

  return (
    <label className="filter-checkbox__label">
	    <input
        className="filter-checkbox__input"
        type="checkbox"
        id="shortfilm"
        name="shortfilm"
        onChange={onChange}
        checked={value}
      />
	    <span className="filter-checkbox__text"/>Короткометражки
    </label>
  )
}

export default FilterCheckbox;
