import { StyleSheet, View } from "react-native";
import RegistrationForm from "../../../src/(features)/auth/components/RegistrationForm";

export default function RegisterScreen() {
  return (
    <View style={styles.screen}>
      <RegistrationForm />
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
