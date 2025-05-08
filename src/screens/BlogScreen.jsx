import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { CategoryList, BlogList } from '../data';
import CategoryItem from '../components/CategoryItem';
import BlogItem from '../components/BlogItem';

const BlogScreen = ({ navigation }) => {
const [selectedCategory, setSelectedCategory] = useState('Semua');  
  const filteredBlogs =
    selectedCategory === 'Semua'
      ? BlogList
      : BlogList.filter((blog) => blog.category === selectedCategory);

  return (
    <View style={styles.container}>
      <FlatList
        data={CategoryList}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryItem
            title={item.categoryName}
            isActive={selectedCategory === item.categoryName}
            onPress={() => setSelectedCategory(item.categoryName)}
          />
        )}
      />

      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BlogItem
            blog={item}
            onPress={() => navigation.navigate('BlogDetail', { blog: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  categoryList: { marginBottom: 16 },
});

export default BlogScreen;