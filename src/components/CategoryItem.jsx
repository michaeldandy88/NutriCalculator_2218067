import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryItem = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, isActive && styles.active]}>
      <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  text: {
    fontSize: 14,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryItem;
