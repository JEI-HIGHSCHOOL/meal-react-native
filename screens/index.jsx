import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl
} from "react-native";
import { useState, useCallback } from "react";
import Meals from "../components/Meal";
import Info from "../components/Info";
import Notice from "../components/Notice";
import Banner from "../components/Banner";

export default function Index({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ minHeight: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Meals />
        <Info />
        <Banner navigation={navigation}/>
        <Notice navigation={navigation} refresh={refreshing} setRefreshing={setRefreshing} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }
});
