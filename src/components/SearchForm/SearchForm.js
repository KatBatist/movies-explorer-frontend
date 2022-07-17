import React from "react";
import Form from '../Form/Form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconSearch from '../../images/icon-search.svg';
import find from '../../images/btn-find-movie.svg';

function SearchForm({ onSearch, defaultInput, defaultCheckbox, onChangeInput, onChangeCheckbox }) {

  const [searchErrorText, setSearchErrorText] = React.useState('');

  const [input, setInput] = React.useState(defaultInput || '');
  const [checkbox, setCheckbox] = React.useState(defaultCheckbox || false);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    onChangeInput(e.target.value);
  };

  const handleChangeCheckbox = () => {
    setCheckbox(!checkbox);
    onChangeCheckbox(!checkbox);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      setSearchErrorText('Нужно ввести ключевое слово');
      setTimeout(() => {
        setSearchErrorText('');
      }, 2000);
    } else {
      onSearch();
    }
  };

  return (
    <div className="search">
    <Form
      form="search"
      onSubmit={handleSubmit}
    >
      <div className="search__container">
        <div className="search__container-find">
          <img className="search__icon" src={iconSearch} alt="Иконка для кнопки поиска фильма." />
          <input
            className="search__input"
            type="'text"
            id="search"
            placeholder="Фильм"
            name="search"
            value={input}
            onChange={handleChangeInput}
          />
          {searchErrorText &&
            <span className="search__span">{searchErrorText}</span>
          }
          <button className="search__submit" type="submit">
            <img className="search__find" src={find} alt="Иконка для строки поиска фильма." />
          </button>
        </div>
        <div className="search__container-checkbox">
          <FilterCheckbox
            value={checkbox}
            onChange={handleChangeCheckbox}
          />
        </div>
      </div>
    </Form>
    </div>
  )
}

export default SearchForm;
