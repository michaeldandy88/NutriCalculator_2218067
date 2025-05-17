import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { Heart, Clock, Message } from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const ItemSmall = ({ item }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.cardItem, { opacity: fadeAnim }]}>
      <FastImage
        style={styles.cardImage}
        source={{
          uri: item.image,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View style={{ flexDirection: 'row', gap: 30 }}>
          <View style={{ gap: 5, flex: 1 }}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Heart color={colors.textSecondary(0.6)} variant="Linear" size={20} />
        </View>
        <View style={styles.cardInfo}>
          <Clock size={10} variant="Linear" color={colors.textSecondary(0.6)} />
          <Text style={styles.cardText}>{item.createdAt}</Text>
          <Message size={10} variant="Linear" color={colors.textSecondary(0.6)} />
          <Text style={styles.cardText}>{item.totalComments}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default ItemSmall;

const styles = StyleSheet.create({
    cardItem: {
      backgroundColor: colors.primaryGreen(0.05),
      flexDirection: 'row',
      borderRadius: 10,
    },
    cardCategory: {
      color: colors.primaryGreen(1),
      fontSize: 10,
      fontFamily: fontType['Poppins-SemiBold'],
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: fontType['Poppins-Bold'],
      color: colors.black(),
    },
    cardText: {
      fontSize: 10,
      fontFamily: fontType['Poppins-Medium'],
      color: colors.textSecondary(0.6), 
    },
    cardImage: {
      width: 94,
      height: 94,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    cardInfo: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    cardContent: {
      gap: 10,
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingLeft: 15,
      flex: 1,
      paddingVertical: 10,
    },
});
