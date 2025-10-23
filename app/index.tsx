import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Wrap in a timeout to ensure layout mounted
    const timeout = setTimeout(() => {
      router.replace('/landing');
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
