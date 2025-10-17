import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome Home</Text>
      <Link href="/about">Go to About</Link>
      <Link href="/contact">Go to Contact</Link>
    </View>
  );
}
