const initialCards = [
  {
    name: "Античное здание",
    link: "https://sun9-80.userapi.com/impg/qot43fNZAC9pUYlYAiuwO4Wn2Q-wLWdPaJmLNQ/tmep9NoW8eY.jpg?size=1024x1024&quality=95&sign=58276785a059d40f3776f736971432a5&type=album",
  },
  {
    name: "Джунгли",
    link: "https://sun9-68.userapi.com/impg/SGHAni6OabX6eergMw7xHdIx-i7YXzAxpgw8_Q/y3DneohcHRY.jpg?size=1024x1024&quality=95&sign=6e5a158da50bfd227b7072f94c182cbd&type=album",
  },
  {
    name: "Ватикан",
    link: "https://sun9-22.userapi.com/impg/KBvsxUU-dalOuEM7pLYFQGxMH_Ssaqyu5CfGFg/0vgRqMPJA4I.jpg?size=1024x1024&quality=95&sign=eb2d8af6edc899eb34b987d2ec2a6359&type=album",
  },
  {
    name: "Биг Бен",
    link: "https://sun9-7.userapi.com/impg/YZVEeD_T5Ai2By1XtDqnleJJzkjzYhkqKcl2ug/j_X_Cm10czg.jpg?size=1024x1024&quality=95&sign=682b49bde60df7d3d7ae05d5368f5481&type=album",
  },
  {
    name: "Пирамида",
    link: "https://sun9-79.userapi.com/impg/dkcXWH6Hqjm58CG4m8_FUTcgJpyyAoSAfo3R8Q/j7Xmv7YlmOg.jpg?size=1024x1024&quality=95&sign=e22fc78778846e8f17c8d58602c84a35&type=album",
  },
  {
    name: "Китай после...",
    link: "https://sun9-65.userapi.com/impg/VEBiS6nym-p56By_ohrydEYKkZ9UZyj3ysNJPw/F3jzO2zG_pE.jpg?size=1024x1024&quality=95&sign=e8884a5c3b44a4a7a5af24705aa02bce&type=album",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export {initialCards, validationConfig};
