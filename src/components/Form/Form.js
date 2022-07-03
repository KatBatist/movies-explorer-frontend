import React from 'react';

function Form({title, buttonText, onSubmit, children, addText, alignHeader, form, formIsValid}) {

  return (
    <form
      className={form === "search" ? "form_search" : "form"}
      onSubmit={onSubmit}
    >
      <h2 className={`form__header form__header_${form}`}>{title}</h2>
      {children}
      {form !== "search" &&
      (<><button
        className={`form__submit form__submit_${form}`}
        type="submit"
        disabled={!formIsValid}>
        {buttonText}
      </button>
      {addText}</>)}
    </form>
  );
}

export default Form;