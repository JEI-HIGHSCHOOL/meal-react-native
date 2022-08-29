import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { IconButton, MD3Colors } from "react-native-paper";

export default function App() {
  const [meal, setMeal] = useState();
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const getMeals = async (date) => {
    const meals = await axios.get(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?type=json&SD_SCHUL_CODE=7310561&ATPT_OFCDC_SC_CODE=E10&MLSV_YMD=2022${date}`
    );
    if (!meals.data.mealServiceDietInfo)
      return ["해당하는 날짜는 급식이 없습니다"];
    let todayMeal = meals.data.mealServiceDietInfo[1]["row"][0]["DDISH_NM"];
    todayMeal = todayMeal.split("<br/>");
    return todayMeal;
  };
  const getDate = (date) => {
    let getMonth;
    let getDate;
    if (date.getMonth() < 10) getMonth = "0" + Number(date.getMonth() + 1);
    else getMonth = Number(today.getMonth() + 1);
    if (date.getDate() < 10) getDate = "0" + Number(date.getDate());
    else getDate = Number(date.getDate());
    return { date: getDate, month: getMonth };
  };
  useEffect(() => {
    const today = getDate(new Date());
    getMeals(`${today.month}${today.date}`).then((data) => {
      setMeal(data);
    });
  }, []);

  const onChangeDate = (value) => {
    const selectDate = getDate(value);
    getMeals(`${selectDate.month}${selectDate.date}`).then((data) => {
      setMeal(data);
    });
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    onChangeDate(date);
    hideDatePicker();
  };

  const onClickNextDate = () => {
    const nextDate = new Date(date.setDate(date.getDate() + 1));
    setDate(nextDate);
    onChangeDate(nextDate);
  };

  const onClickBackDate = () => {
    const backDate = new Date(date.setDate(date.getDate() - 1));
    setDate(backDate);
    onChangeDate(backDate);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.gif")} />
      <View style={styles.selectDate}>
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => onClickBackDate()}
        />
        <Text style={styles.dateText} onPress={showDatePicker}>
          {dayjs(new Date(date)).format("MM월 DD일")}
        </Text>
        <IconButton
          icon="arrow-right"
          size={20}
          onPress={() => onClickNextDate()}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="ko"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {meal ? (
        <>
          <View style={styles.mealList}>
            {meal.map((meal, index) => (
              <Text style={styles.meal} key={index}>
                {meal}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text>로딩중...</Text>
        </>
      )}
      <StatusBar style="auto" />
      <Text style={styles.footer}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 90,
  },
  logo: {
    marginTop: 60,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 20,
  },
  mealList: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  meal: {
    fontSize: 20,
  },
  selectDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {},
});
