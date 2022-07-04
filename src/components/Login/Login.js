import React from 'react';
import useFormWithValidation from '../../utils/useFormValidation';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Error from '../Error/Error';

function Login({ onAuthorization, authStatus} ) {

  const [isAuthError, setIsAuthError] = React.useState(false);
  const [authErrorText, setAuthErrorText] = React.useState(null);

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuthorization(values);
  };

  const childrenButton = (
    <div className="form__message">Ещё не зарегистрированы?
      <Link className="form__link" to="/signup"> Регистрация</Link>
    </div> )

  const errorHandler = () => {
    if (authStatus) {
      switch (authStatus) {
        case 200:
        setIsAuthError(false);
        setAuthErrorText('');
        resetForm();
        break;
        default:
        setIsAuthError(true);
        setAuthErrorText("Неверно указана почта или пароль");
        break;
      };
    };
  }

  React.useEffect(() => {
    errorHandler();
  }, [authStatus]);

  const inputList = [
    {
      key: "1",
      id: "email",
      name: "email",
      type: "email",
      nameRU: "E-mail",
      required: true,
    },
    {
      key: "2",
      id: "password",
      name: "password",
      type: "password",
      nameRU: "Пароль",
      required: true
    }
  ];

  const list = inputList.map((item) => (
    <div className="form__container-item" key={item.key}>
      <label className="form__label">{item.nameRU}
        <input
          className="form__input"
          type={item.type}
          id={item.id}
          placeholder={item.nameRU}
          name={item.name}
          minLength={item.minLength}
          maxLength={item.maxLength}
          value={values[item.name]  || ''}
          onChange={handleChange}
          required={item.required}
        />
      </label>
      <Error
        classNameError="error_left"
        textError={errors[item.name]}
      />
    </div>
  ));

  return (
    <div className="register">
      <div className="register__container-logo">
        <Logo />
      </div>
      <Form
        form="login"
        formIsValid={isValid}
        title="Рады видеть!"
        onSubmit={handleSubmit}
        containerButton="login__container-button"
        textButton="Войти"
        childrenButton={childrenButton}
        textError={isAuthError && authErrorText}
      >
        <div className="login__container">
          {list}
        </div>
      </Form>
    </div>
  )
}

export default Login;
