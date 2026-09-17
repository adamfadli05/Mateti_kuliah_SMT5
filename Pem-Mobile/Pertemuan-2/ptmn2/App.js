import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama Lengkap: Adam Fadli</Text>
      <Text>Tempat, Tanggal Lahir: Kuningan, 05 NOvember 2005</Text>
      <Text>Cita-Cita: Menjadi seorang programmer</Text>
      <Text>Rencana Hidup: Mengembangkan kemampuan di bidang teknologi dan membangun aplikasi yang bermanfaat</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});