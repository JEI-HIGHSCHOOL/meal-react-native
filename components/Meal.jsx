import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { getDate } from "../utils/date";
import Lottie from "lottie-react-native";

const Meals = () => {
  const [meal, setMeal] = useState();
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const getMeals = async date => {
    const meals = await axios
      .get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?type=json&SD_SCHUL_CODE=7310561&ATPT_OFCDC_SC_CODE=E10&MLSV_YMD=${date}&KEY=c83cfc7e1e3c48249749f57fb666ed16`
      )
      .catch(e => {
        return ["급식을 불러오는중 오류가 발생했습니다"];
      });
    if (!meals.data.mealServiceDietInfo)
      return ["해당하는 날짜는 급식이 없습니다"];
    let todayMeal = meals.data.mealServiceDietInfo[1]["row"][0]["DDISH_NM"];
    todayMeal = todayMeal.split("<br/>");
    return todayMeal;
  };

  useEffect(() => {
    getMeals(getDate(new Date())).then(data => {
      setMeal(data);
    });
  }, []);

  const onChangeDate = date => {
    setMeal(null);
    getMeals(getDate(date)).then(data => {
      setMeal(data);
    });
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
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
    <>
      <View style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: 175,
        marginBottom: 40
      }}>
        <View style={styles.selectDate}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => onClickBackDate()}
          />
          <Text style={styles.dateText} onPress={showDatePicker}>
            {dayjs(new Date(date)).format("MM월 DD일 급식")}
          </Text>
          <IconButton
            icon="arrow-right"
            size={24}
            onPress={() => onClickNextDate()}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="ko"
          date={date}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor="black"
          confirmTextIOS="선택"
          cancelTextIOS="취소"
        />
        <View style={styles.mealList}>
          {meal ? (
            <>
              {meal.map((meal, index) => (
                <Text style={styles.meal} key={index}>
                  {meal}
                </Text>
              ))}
            </>
          ) : (
            <Lottie
              source={require("../assets/animation/food_loading.json")}
              autoPlay
              loop
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 20,
  },
  mealList: {
    width: "90%",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F3F4",
    padding: 12,
    borderRadius: 15,
  },
  meal: {
    fontSize: 16.5,
  },
  selectDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
  },
});

export default Meals;
