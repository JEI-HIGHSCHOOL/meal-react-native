import dayjs from "dayjs"

export const getDate = date => {
  return dayjs(date).format("YYYYMMDD")
};
