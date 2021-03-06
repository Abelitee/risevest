import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastMsg";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  const { isLoadingComplete, onBoardingStatus, tokenStatus } =
    useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation
            colorScheme={colorScheme}
            onboarding={onBoardingStatus}
            token={tokenStatus}
          />
          <StatusBar />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
