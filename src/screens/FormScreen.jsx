import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors, fontType } from '../theme';

const FormScreen = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [kalori, setKalori] = useState('');
  const [protein, setProtein] = useState('');
  const [lemak, setLemak] = useState('');
  const [karbo, setKarbo] = useState('');

  const handleSubmit = () => {
    if (!nama || !kalori || !protein || !lemak || !karbo) {
      Alert.alert('Peringatan', 'Semua field harus diisi!');
      return;
    }

    // Simulasi submit
    Alert.alert('Berhasil', 'Data berhasil ditambahkan!');
    navigation.goBack(); // kembali ke screen sebelumnya
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Data Nutrisi</Text>

      <TextInput
        placeholder="Nama Makanan/Minuman"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />
      <TextInput
        placeholder="Kalori (kkal)"
        value={kalori}
        onChangeText={setKalori}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Protein (g)"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Lemak (g)"
        value={lemak}
        onChangeText={setLemak}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Karbohidrat (g)"
        value={karbo}
        onChangeText={setKarbo}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Simpan Data" onPress={handleSubmit} color={colors.primaryGreen()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background(),
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Poppins-Bold'],
    marginBottom: 20,
    color: colors.textPrimary(),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary(0.4),
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontFamily: fontType['Poppins-Regular'],
    color: colors.textPrimary(),
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default FormScreen;
