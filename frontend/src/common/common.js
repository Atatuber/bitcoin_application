export function hasErrors(formData, setErrors, validateField) {
  return Object.keys(formData).some((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
    }
    return !!error;
  });
}
