// export const handleMobileValidate = (value) => {
//   const updated = value.replace("+1", "").replace("+91", "")
//   const TEN_DIGIT_PHONE_REGEX = new RegExp(`^[0-9]{10}$`);
//   return TEN_DIGIT_PHONE_REGEX.test(updated) && (value.indexOf("+1") > -1 || value.indexOf("+91") > -1);
// }

export const handleMobileValidate = (value) => {
  const NUMBER_WITH_PREFIX_REGEX = /^(\+91|\+1)\d{10}$/;
  return NUMBER_WITH_PREFIX_REGEX.test(value);
};


export const handleEmailValidate = (value) => {
  const EMAIL_REGEX = new RegExp(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`);
  return EMAIL_REGEX.test(value);
}
