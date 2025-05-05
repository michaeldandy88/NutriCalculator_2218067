import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Heart } from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import { fontType, colors } from '../theme';

const ItemHorizontal = ({ item, variant, onPress }) => {
  return (
    <View style={styles.cardItem}>
      <FastImage
        style={styles.cardImage}
        source={{
          uri: item.image,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.createdAt}</Text>
          </View>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.cardIcon}>
              <Heart color={colors.white()} variant={variant} size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </FastImage>
    </View>
  );
};

const ListHorizontal = ({ data }) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({
    cardItem: {
      width: 280,
    },
    cardImage: {
      width: '100%',
      height: 200,
      borderRadius: 15,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    cardInfo: {
      justifyContent: 'flex-end',
      height: '100%',
      gap: 10,
      maxWidth: '65%',
    },
    cardTitle: {
      fontFamily: fontType['Poppins-Bold'],
      fontSize: 14,
      color: colors.white(),
    },
    cardText: {
      fontSize: 10,
      color: colors.white(),
      fontFamily: fontType['Poppins-Medium'],
    },
    cardIcon: {
      backgroundColor: colors.white(0.33),
      padding: 5,
      borderColor: colors.white(),
      borderWidth: 0.5,
      borderRadius: 5,
    },
});
