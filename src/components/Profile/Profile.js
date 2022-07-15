import React from 'react';
import useFormWithValidation from '../../utils/useFormValidation';
import { CurrentUserContext} from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import Error from '../Error/Error';

function Profile({ onUpdate, onSignOut, userStatus }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isUserError, setIsUserError] = React.useState(false);
  const [userErrorText, setUserErrorText] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdate(values)
    handleToggleEditableProfile();
    resetForm(currentUser);
  };

  const handleToggleEditableProfile = () => {
    setIsEdit(!isEdit);
    setIsUserError(false);
    setUserErrorText('');
  };

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm])

  React.useEffect(() => {
    setFormIsValid(isValid);
  }, [isValid, values])

  React.useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setFormIsValid(false);
    }
  }, [currentUser, values])

  const childrenButton = (
    <button className="profile__btn-signout" onClick={onSignOut}>Выйти из аккаунта</button>)

  const errorHandler = () => {
    if (userStatus) {
      switch (userStatus) {
        case 200:
          setIsUserError(false);
          setUserErrorText('');
          resetForm(currentUser);
          break;
        case 400:
        case 404:
          setIsUserError(true);
          setUserErrorText("Переданы некорректные данные");
          break;
        case 409:
          setIsUserError(true);
          setUserErrorText("Пользователь с таким email уже существует");
          break;
        case 500:
          setIsUserError(true);
          setUserErrorText("На сервере произошла ошибка");
          break;
        default:
          setIsUserError(true);
          setUserErrorText("На сервере произошла ошибка");
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
          pattern={item.pattern}
          value={values[item.name] || ''}
          onChange={handleChange}
          required={item.required}
        />
      </label>
      <Error
        classNameError="error_left error_profile"
        textError={errors[item.name]}
      />
    </div>
  ));

  return (
    <div className="profile">
      <Form
        form="profile"
        formIsValid={formIsValid}
        title={`Привет, ${currentUser.name}!`}
        onSubmit={handleSubmit}
        containerButton="profile__container-button"
        textButton="Редактировать"
        childrenButton={childrenButton}
        textError={isUserError && userErrorText}
      >
        <div className="profile__container">
          {list}
        </div>
      </Form>
    </div>
  )
}

export default Profile;
