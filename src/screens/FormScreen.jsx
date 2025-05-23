import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors, fontType } from '../theme';
import { createNutrisi } from '../firebase/nutrisi';
import notifee from '@notifee/react-native';

const FormScreen = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [kalori, setKalori] = useState('');
  const [protein, setProtein] = useState('');
  const [lemak, setLemak] = useState('');
  const [karbo, setKarbo] = useState('');

  useEffect(() => {
    const createChannel = async () => {
      await notifee.createChannel({
        id: 'nutrisi',
        name: 'Notifikasi Nutrisi',
      });
    };
    createChannel();
  }, []);

  const showNotification = async () => {
    await notifee.requestPermission();

    await notifee.displayNotification({
      title: 'Data Nutrisi Tersimpan',
      body: `Data untuk "${nama}" berhasil ditambahkan.`,
      android: {
        channelId: 'nutrisi',
        smallIcon: 'ic_launcher', 
      },
    });
  };

  const handleSubmit = async () => {
    if (!nama || !kalori || !protein || !lemak || !karbo) {
      Alert.alert('Peringatan', 'Semua field harus diisi!');
      return;
    }

    try {
      await createNutrisi({
        nama,
        kalori: Number(kalori),
        protein: Number(protein),
        lemak: Number(lemak),
        karbo: Number(karbo),
        createdAt: new Date().toISOString(),
      });

      await showNotification(); 

      Alert.alert('Berhasil', 'Data berhasil disimpan ke Firebase!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Data Nutrisi</Text>

      <TextInput
        placeholder="Nama Makanan/Minuman"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Kalori (kkal)"
        value={kalori}
        onChangeText={setKalori}
        keyboardType="numeric"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Protein (g)"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Lemak (g)"
        value={lemak}
        onChangeText={setLemak}
        keyboardType="numeric"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Karbohidrat (g)"
        value={karbo}
        onChangeText={setKarbo}
        keyboardType="numeric"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
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