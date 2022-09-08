import {
  AdMobBanner
} from "expo-ads-admob";
import { Platform } from "react-native";

const adBannerUnitId =
  Platform.OS === "android"
    ? __DEV__
      ? "ca-app-pub-3940256099942544/6300978111"
      : "ca-app-pub-2701426579223876/4749238844"
    : __DEV__
    ? "ca-app-pub-3940256099942544/2934735716"
    : "ca-app-pub-2701426579223876/4424174902";

export default Ads = () => {
  return (
    <>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={adBannerUnitId} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={err => {
          console.log(err);
        }}
        style={{
          marginTop: "auto",
          marginBottom: 10,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
    </>
  );
};
