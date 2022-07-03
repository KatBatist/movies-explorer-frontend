import React from 'react';
import useFormWithValidation from '../../utils/useFormValidation';
import Form from '../Form/Form';

function Profile({onUpdateCurrentUser, onSignOut, userStatus, currentUser}) {

  const [isUserError, setIsUserError] = React.useState(false);
  const [userErrorText, setUserErrorText] = React.useState('');

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateCurrentUser(values)
    resetForm(currentUser);
  };

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm])

  const addText = (
    <button className="profile__btn-signout" onClick={onSignOut}>Выйти из аккаунта</button>)

  const errorHandler = () => {
    if (userStatus) {
      switch (userStatus) {
        case 200:
          setIsUserError(false);
          setUserErrorText('');
          resetForm();
          break;
        case 400:
          setIsUserError(true);
          setUserErrorText("Переданы некорректные данные");
          break;
        case 409:
          setIsUserError(true);
          setUserErrorText("Пользователь с таким email уже существует.");
          break;
        default:
          setIsUserError(true);
          setUserErrorText("Что-то пошло не так...");
          break;
      };
    };
  };

  React.useEffect(() => {
    errorHandler();
  }, [userStatus]);

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
    }
  ];

  const list = inputList.map((item) => (
    <div className="form__container-item form__container-item_profile" key={item.key}>
      <label className="form__label_profile">
        {item.nameRU}
        <input
          className="form__input_profile"
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
      <span className="form__input-error">
        {item.name === "password" && isUserError
          ? (userErrorText)
          : (errors[item.name])
        }
      </span>
    </div>
  ));

  return (
    <div className="profile">
      <Form
        title={`Привет, ${currentUser.name}!`} buttonText="Редактировать"
        onSubmit={handleSubmit}
        addText={addText}
        alignHeader="center"
        form="profile"
        formIsValid={isValid}
      >
        <div className="profile__container">
          {list}
        </div>
      </Form>
    </div>
  )
}

export default Profile;
