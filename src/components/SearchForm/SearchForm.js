import React from "react";
import useFormWithValidation from '../../utils/useFormValidation';
import Form from '../Form/Form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/icon-search.svg';
import find from '../../images/btn-find-movie.svg';

function SearchForm({onSubmit}) {

  const {
    values,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
    resetForm();
  };

  return (
    <div className="search">
    <Form
      form="search"
      onSubmit={handleSubmit}
    >
      <div className="search__container">
        <div className="search__container-find">
          <img className="search__icon" src={search} alt="Иконка для кнопки поиска фильма." />
          <input
            className="search__input"
            type="'text"
            id="search"
            placeholder="Фильм"
            name="search"
            required={false}
            onChange={handleChange}
          />
          <button className="search__submit" type="submit">
            <img className="search__find" src={find} alt="Иконка для строки поиска фильма." />
          </button>
        </div>
        <div className="search__container-checkbox">
          <FilterCheckbox
            onChange={handleChange}
          />
        </div>
      </div>
    </Form>
    </div>
  )
}

export default SearchForm;
