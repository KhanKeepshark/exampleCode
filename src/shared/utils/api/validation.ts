const errorData: any = {
  "Password is incorrect": "Неверный пароль",
  "User not found": "Такой пользователь не найден",
  incorrect: "неверный код"
};

export const errorMessage = (res: any) => {
  const responseMessage = res.data.message;
  const responseStatus = res.status;
  if (responseStatus === 500) {
    return "Ошибка сервера";
  }
  if (errorData[responseMessage]) {
    return errorData[responseMessage];
  }
  return "Неизвестная ошибка сервера";
};
