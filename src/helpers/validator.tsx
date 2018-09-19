const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validate = {
  email: email => ({
    result: email && emailRegex.test(email),
    errorText: "Please, enter a valid email address"
  }),
  fieldExistence: fieldValue => ({
    result: fieldValue && fieldValue.length > 0,
    errorText: "This field is required"
  }),
  password: password => ({
    result: password && password.length > 0 && passwordRegex.test(password),
    errorText:
      "Please, enter at least 8 character password with at least 1 letter and 1 number"
  }),
  username: username => {
    return {
      result: !!(username && username.length > 2),
      errorText: "Please, enter username using letter and numbers"
    };
  },
  phone: phone => ({
    result: validatePhone(phone),
    errorText: "Please, enter a valid phone number"
  })
};

const validatePhone = phone => {
  const removedPlusOne = phone.replace("+1", "");
  const normalizedPhone = removedPlusOne
    .split("")
    .filter(
      symbol =>
        !(symbol === ")" || symbol === "(" || symbol === " " || symbol === "-")
    )
    .join("");

  return normalizedPhone && normalizedPhone.length === 10;
};
