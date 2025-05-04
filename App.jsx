import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import { SearchNormal1, Heart, Chart, AddCircle } from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primaryGreen()} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>NutriCalculator</Text>
        <Text style={styles.subtitle}>Pantau dan hitung asupan nutrisi harianmu</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchNormal1 size={20} color={colors.textSecondary()} />
        <TextInput
          placeholder="Cari makanan atau minuman..."
          placeholderTextColor={colors.textSecondary(0.6)}
          style={styles.searchInput}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Fitur Utama</Text>

        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem}>
            <AddCircle size={32} color={colors.primaryGreen()} variant="Bold" />
            <Text style={styles.menuText}>Tambah Makanan</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Chart size={32} color={colors.primaryGreen()} variant="Bold" />
            <Text style={styles.menuText}>Grafik Nutrisi</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Heart size={32} color={colors.primaryGreen()} variant="Bold" />
            <Text style={styles.menuText}>Kesehatan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: fontType['Poppins-Bold'],
    color: colors.primaryGreen(),
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontType['Poppins-Regular'],
    color: colors.textSecondary(),
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card(),
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: fontType['Poppins-Regular'],
    color: colors.textPrimary(),
  },
  content: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontType['Poppins-SemiBold'],
    color: colors.textPrimary(),
    marginBottom: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: colors.card(),
    paddingVertical: 16,
    borderRadius: 16,
    width: '30%',
    elevation: 1,
  },
  menuText: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: fontType['Poppins-Medium'],
    color: colors.textPrimary(),
    textAlign: 'center',
  },
});

export default App;
