import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, fontType } from '../theme';

const screenWidth = Dimensions.get('window').width;

const NutritionChartScreen = () => {
  
  const data = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        data: [1800, 2000, 1500, 1700, 2200, 1900, 2100],
        color: () => colors.primaryGreen(),
        strokeWidth: 2,
      },
    ],
    legend: ['Kalori (kkal)'],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Grafik Kalori Mingguan</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={250}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 122, 51, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#006633',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Poppins-Bold'],
    marginBottom: 20,
    color: colors.textPrimary(),
  },
  chart: {
    borderRadius: 10,
  },
});

export default NutritionChartScreen;
