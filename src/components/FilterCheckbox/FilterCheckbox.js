import React from 'react';

function FilterCheckbox({onChange}) {

  return (
    <label className="filter-checkbox__label">
	    <input
        className="filter-checkbox__input"
        type="checkbox"
        onChange={onChange}
      />
	    <span className="filter-checkbox__text"/>Короткометражки
    </label>
  )
}

export default FilterCheckbox;
