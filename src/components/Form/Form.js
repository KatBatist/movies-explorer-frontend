import React from 'react';
import Error from '../Error/Error';

function Form({
  form,
  formIsValid,
  title,
  children,
  onSubmit,
  containerButton,
  textButton,
  childrenButton,
  textError
}) {

  return (
    <form
      className={form === "search" ? "form_search" : "form"}
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className={`form__header form__header_${form}`}>{title}</h2>
      {children}
      {form !== "search" &&
        (<div className={containerButton}>
          <Error
            classNameError="error_status"
            textError={textError}
          />
          <button
            className={`form__submit form__submit_${form}`}
            type="submit"
            disabled={!formIsValid}>
            {textButton}
          </button>
           {childrenButton}
        </div>)
      }
    </form>
  );
}

export default Form;
