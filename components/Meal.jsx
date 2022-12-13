import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { getDate } from "../utils/date";
import { fetchMeal } from "../store/slices/mealSlice";
import Lottie from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";

const Meals = () => {
  const dispatch = useDispatch();
  const { meals, loading } = useSelector((state) => state.meal);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const onChangeDate = (date) => {
    dispatch(fetchMeal({ date: getDate(date) }))
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
    const nextDate = dayjs(date).add(1, "day").toDate();
    setDate(nextDate);
    onChangeDate(nextDate);
  };

  const onClickBackDate = () => {
    const backDate = dayjs(date).subtract(1, "day").toDate();
    setDate(backDate);
    onChangeDate(backDate);
  };
  return (
    <>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          height: 175,
          marginBottom: 40,
        }}
      >
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
          {loading ? (
            <Lottie
              source={require("../assets/animation/food_loading.json")}
              autoPlay
              loop
            />
          ) : (
            <>
              {meals.map((meal, index) => (
                <Text style={styles.meal} key={index}>
                  {meal}
                </Text>
              ))}
            </>
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
