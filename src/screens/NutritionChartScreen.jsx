import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getAllNutrisi } from '../firebase/nutrisi';

const NutritionChartScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllNutrisi().then(setData).catch(console.error);
  }, []);

  // Validasi dan konversi data
  const validData = data.filter(item => {
    const kalori = Number(item.kalori);
    return !isNaN(kalori) && isFinite(kalori);
  });

  const chartData = {
    labels: validData.map(item => item.nama),
    datasets: [
      {
        data: validData.map(item => Number(item.kalori)),
      },
    ],
  };

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
        Grafik Kalori Makanan
      </Text>

      {validData.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
          Belum ada data nutrisi untuk ditampilkan.
        </Text>
      ) : (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisSuffix=" kkal"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#4CAF50',
            backgroundGradientTo: '#81C784',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => '#fff',
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center',
          }}
        />
      )}
    </ScrollView>
  );
};

export default NutritionChartScreen;
