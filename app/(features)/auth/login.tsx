import { StyleSheet, View } from "react-native";
import LoginForm from "../../../src/(features)/auth/components/LoginForm";

export default function LoginScreen() {
  return (
    <View style={styles.screen}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
});
