const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";
export const validateEmail = email => email && emailRegex.test(email);
export const validateCommonField = fieldValue =>
  fieldValue && fieldValue.length > 0;

export const validatePassword = password => password && password.length > 0;
// export const validatePhone = phone => {
//   const removedPlusOne = phone.replace("+1", "");
//   const normalizedPhone = removedPlusOne
//     .split("")
//     .filter(
//       symbol =>
//         !(symbol === ")" || symbol === "(" || symbol === " " || symbol === "-")
//     )
//     .join("");

//   return normalizedPhone && normalizedPhone.length === 10;
// };
