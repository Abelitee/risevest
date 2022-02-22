import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { setCustomText } from "react-native-global-props";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function defaultFonts() {
    const customTextProps = {
      style: {
        fontFamily: "DM",
      },
    };
    setCustomText(customTextProps);
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          // "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          tomato: require("../assets/fonts/TomatoGrotesk-Regular.otf"),
          DM: require("../assets/fonts/DMSans-Regular.ttf"),
          DMB: require("../assets/fonts/DMSans-Bold.ttf"),
          tomatoB: require("../assets/fonts/TomatoGrotesk-Bold.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        defaultFonts();
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
