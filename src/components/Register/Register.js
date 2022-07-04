import React from 'react';
import useFormWithValidation from '../../utils/useFormValidation';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Error from '../Error/Error';

function Register({onRegistration, regStatus}) {

  const [isRegError, setIsRegError] = React.useState(false);
  const [regErrorText, setRegErrorText] = React.useState('');

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegistration(values);
  };

  const childrenButton = (
    <div className="form__message">Уже зарегистрированы?
      <Link className="form__link" to="/signin"> Войти</Link>
    </div> )

  const errorHandler = () => {
    if (regStatus) {
      switch (regStatus) {
        case 200:
          setIsRegError(false);
          setRegErrorText('');
          resetForm();
          break;
        case 400:
          setIsRegError(true);
          setRegErrorText("Переданы некорректные данные");
          break;
        case 409:
          setIsRegError(true);
          setRegErrorText("Пользователь с таким email уже существует.");
          break;
        default:
          setIsRegError(true);
          setRegErrorText("Что-то пошло не так...");
          break;
      };
    };
  };

  React.useEffect(() => {
    errorHandler();
  }, [regStatus]);

  const inputList = [
    {
      key: "1",
      id: "name",
      name: "name",
      type: "text",
      minLength: "2",
      maxLength: "30",
      nameRU: "Имя",
      required: true,
    },
    {
      key: "2",
      id: "email",
      name: "email",
      type: "email",
      nameRU: "E-mail",
      required: true,
    },
    {
      key: "3",
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
        key={item.key}
        className={item.name === "email" ? "form__input form__input_color" : "form__input"}
        type={item.type}
        id={item.id}
        placeholder={item.nameRU}
        name={item.name}
        minLength={item.minLength}
        maxLength={item.maxLength}
        value={values[item.name] || ''}
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
        formIsValid={isValid}
        title="Добро пожаловать!"
        onSubmit={handleSubmit}
        containerButton="register__container-button"
        textButton="Зарегистрироваться"
        childrenButton={childrenButton}
        textError={isRegError && regErrorText}
      >
        <div className="register__container">
          {list}
        </div>
      </Form>
    </div>
  )
}

export default Register;

