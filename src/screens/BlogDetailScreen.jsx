import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const BlogDetailScreen = ({ route }) => {
  const { blog } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: blog.image }} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.meta}>{blog.createdAt} • {blog.totalComments} Komentar</Text>
      <Text style={styles.content}>
        {/* Simulasi konten blog */}
        Salad Sayur

Bahan:

Selada – 5 lembar
Tomat cherry – 10 buah
Mentimun – 1/2 buah
Paprika kuning – 1 buah
Kol ungu – 1/4 buah

Lime Dressing:

Air jeruk nipis – 3 sdm
Madu – 2 sdm
Olive oil – 3 sdm
Mayonnaise – 2 sdm
Bawang putih, cincang halus – 1 buah
Lada hitam bubuk – secukupnyaGaram – 1/4 sdt

Cara Membuat:

Cuci bersih selada, tomat, mentimun, paprika dan kol ungu. Potong-potong semua sayuran sesuai selera.
Campur semua bahan dressing, kemudian aduk rata.
Tata sayuran yang sudah di potong-potong di piring saji, kemudian siram dengan bahan dressing.
Simpan salad sayur di kulkas selama 20 menit sampai bumbu meresap.
Salad sayur siap disajikan.
Tips
Supaya lebih sehat, garam juga bisa bisa diganti dengan sea salt.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  meta: { fontSize: 14, color: 'gray', marginBottom: 16 },
  content: { fontSize: 16, lineHeight: 24 },
});

export default BlogDetailScreen;
