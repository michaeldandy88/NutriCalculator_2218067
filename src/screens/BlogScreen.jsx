import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { CategoryList } from '../data';
import CategoryItem from '../components/CategoryItem';
import BlogItem from '../components/BlogItem';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../api'; 

const BlogScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [blogs, setBlogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setAuthor('');
    setContent('');
    setModalVisible(false);
    setIsEditing(false);
    setSelectedBlog(null);
  };

  const handleSubmit = () => {
    if (!title || !category || !image || !author || !content) {
      Alert.alert('Peringatan', 'Semua field harus diisi!');
      return;
    }

    if (isEditing && selectedBlog) {
      const updatedBlog = {
        title,
        category,
        image,
        author,
        content,
        createdAt: selectedBlog.createdAt,
        totalComments: selectedBlog.totalComments,
      };

      updateBlog(selectedBlog.id, updatedBlog)
        .then(() => {
          Alert.alert('Sukses', 'Artikel berhasil diperbarui!');
          fetchData();
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      const newBlog = {
        title,
        category,
        image,
        createdAt: new Date().toISOString(),
        totalComments: 0,
        author,
        content,
      };

      createBlog(newBlog)
        .then(() => {
          Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
          fetchData();
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus artikel ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          deleteBlog(id)
            .then(() => {
              Alert.alert('Dihapus', 'Artikel berhasil dihapus!');
              fetchData();
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  };

  const filteredBlogs =
    selectedCategory === 'Semua'
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

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
          <View style={{ marginBottom: 16 }}>
            <BlogItem
              blog={item}
              onPress={() => navigation.navigate('BlogDetail', { blog: item })}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedBlog(item);
                  setIsEditing(true);
                  setModalVisible(true);
                  setTitle(item.title);
                  setCategory(item.category);
                  setImage(item.image);
                  setAuthor(item.author);
                  setContent(item.content);
                }}
                style={{ backgroundColor: '#FFC107', padding: 8, borderRadius: 6 }}
              >
                <Text style={{ color: '#fff' }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{ backgroundColor: '#F44336', padding: 8, borderRadius: 6 }}
              >
                <Text style={{ color: '#fff' }}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal Tambah/Edit Data */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Edit Artikel' : 'Tambah Artikel'}
          </Text>

          <TextInput placeholder="Judul" value={title} onChangeText={setTitle} style={styles.input} />
          <TextInput placeholder="Kategori" value={category} onChangeText={setCategory} style={styles.input} />
          <TextInput placeholder="URL Gambar" value={image} onChangeText={setImage} style={styles.input} />
          <TextInput placeholder="Penulis" value={author} onChangeText={setAuthor} style={styles.input} />
          <TextInput
            placeholder="Konten Artikel"
            value={content}
            onChangeText={setContent}
            style={[styles.input, { height: 100 }]}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>
              {isEditing ? 'Perbarui' : 'Simpan'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={resetForm} style={{ marginTop: 10 }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>Batal</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Tombol Floating */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsEditing(false);
          setSelectedBlog(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  categoryList: { marginBottom: 16 },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BlogScreen;
