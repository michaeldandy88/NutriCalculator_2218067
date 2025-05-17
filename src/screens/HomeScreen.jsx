import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchNormal1, Heart, Chart, AddCircle } from 'iconsax-react-native';
import { fontType, colors } from '../theme';
import { CategoryList, BlogList } from '../data.jsx';
import { ListHorizontal, ItemSmall } from '../components';

const HomeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(1);

  const renderCategoryItem = ({ item }) => {
    const color = item.id === selected ? colors.primaryGreen() : colors.textSecondary();
    return (
      <TouchableOpacity onPress={() => setSelected(item.id)}>
        <View style={stylesCategory.item}>
          <Text style={{ ...stylesCategory.title, color }}>{item.categoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FlatListCategory = () => (
    <FlatList
      data={CategoryList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCategoryItem}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );

  const horizontalData = BlogList.slice(0, 5);
  const verticalData = BlogList.slice(5);

  const ListBlog = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <ListHorizontal data={horizontalData} />
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const bounceAdd = useRef(new Animated.Value(1)).current;
  const bounceChart = useRef(new Animated.Value(1)).current;
  const bounceBlog = useRef(new Animated.Value(1)).current;

  const bounceIn = (anim) => {
    Animated.spring(anim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const bounceOut = (anim, navigateTo) => {
    Animated.spring(anim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(navigateTo);
    });
  };

  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primaryGreen()} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          <View style={styles.menuContainer}>
            <TouchableWithoutFeedback
              onPressIn={() => bounceIn(bounceAdd)}
              onPressOut={() => bounceOut(bounceAdd, 'Form')}>
              <Animated.View style={[styles.menuItem, { transform: [{ scale: bounceAdd }] }]}>
                <AddCircle size={32} color={colors.primaryGreen()} variant="Bold" />
                <Text style={styles.menuText}>Tambah Makanan</Text>
               </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPressIn={() => bounceIn(bounceChart)}
              onPressOut={() => bounceOut(bounceChart, 'NutritionChart')}>
              <Animated.View style={[styles.menuItem, { transform: [{ scale: bounceChart }] }]}>
                <Chart size={32} color={colors.primaryGreen()} variant="Bold" />
               <Text style={styles.menuText}>Grafik Nutrisi</Text>
               </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPressIn={() => bounceIn(bounceBlog)}
              onPressOut={() => bounceOut(bounceBlog, 'Blog')}>
              <Animated.View style={[styles.menuItem, { transform: [{ scale: bounceBlog }] }]}>
                <Heart size={32} color={colors.primaryGreen()} variant="Bold" />
                <Text style={styles.menuText}>Kesehatan</Text>
                 </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <FlatListCategory />
        </View>

        <ListBlog />
      </ScrollView>
    </View>
  );
};

const stylesCategory = StyleSheet.create({
  item: {
    backgroundColor: colors.card(),
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontFamily: fontType['Poppins-Medium'],
    fontSize: 14,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
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
  listBlog: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  listCard: {
    marginTop: 16,
    gap: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.background(),
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontType['Poppins-Bold'],
    color: colors.textPrimary(),
    marginBottom: 15,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card(),
    padding: 15,
    borderRadius: 10,
    flex: 1,
    elevation: 2,
  },
  menuText: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: fontType['Poppins-Medium'],
    color: colors.textPrimary(),
    textAlign: 'center',
  },
});

export default HomeScreen;
