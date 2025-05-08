import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

const BlogItem = ({ blog, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: blog.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.meta}>{blog.createdAt} • {blog.totalComments} komentar</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 16 },
  image: { width: 100, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 12, color: 'gray' },
});

export default BlogItem;
