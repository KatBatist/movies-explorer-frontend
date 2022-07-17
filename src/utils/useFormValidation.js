import { useState, useCallback } from "react";

export default function useFormWithValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (target.id === 'email') {
      target.setCustomValidity(
        emailRegex.test(target.value) || target.value === '' ? '' : 'Некорректный адрес эл.почты'
      );
    }

    const nameRegex = /^[a-zA-Zа-яА-я -]{2,30}$/;
    if (target.id === 'name') {
      target.setCustomValidity(
        nameRegex.test(target.value) || target.value === '' ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис'
      );
    }

    setValues({
      ...values,
      [name]: value});

    setErrors({
      ...errors,
      [name]: target.validationMessage
    });

    setIsValid(target.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  return { values, errors, isValid, handleChange, resetForm,};
};