export const getDate = date => {
  let getMonth;
  let getDate;
  if ((date.getMonth() + 1) < 10) getMonth = "0" + Number(date.getMonth() + 1);
  else getMonth = Number(date.getMonth() + 1);
  if ((date.getDate() + 1) < 10) getDate = "0" + Number(date.getDate());
  else getDate = Number(date.getDate());
  console.log(date.getFullYear() + getMonth.toString() + getDate.toString())
  return date.getFullYear() + getMonth.toString() + getDate.toString();
};
