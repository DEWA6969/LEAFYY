import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Progress, Text } from '../components/ui';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [58, 60, 62, 61, 65, 67, 70],
      color: (opacity = 1) => `rgba(229, 243, 229, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

export default function Dashboard({ navigation }) {
  const { colors } = useTheme();
  const [exampleFromServer, setExampleFromServer] = useState('');

  useEffect(() => {
    fetchDemo();
  }, []);

  const fetchDemo = async () => {
    try {
      // In React Native, you would typically use your API endpoint
      // For now, we'll simulate the data
      setExampleFromServer('Connected to server');
    } catch (error) {
      // Silently ignore
    }
  };

  const handleDetailsPress = () => {
    // Navigate to the dedicated Soil Moisture Details screen
    navigation.navigate('SoilMoistureDetails');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.space}>
        {/* Welcome Section */}
        <Card style={[styles.welcomeCard, { backgroundColor: colors.background }]}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text variant="caption" style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>Welcome back</Text>
              <Text variant="h2" style={[styles.welcomeTitle, { color: colors.text }]}>Hi, Alfi</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: colors.surface }]}>
              <Ionicons name="leaf-outline" size={16} color={colors.text} />
              <Text variant="caption" style={[styles.statusText, { color: colors.text }]}>Leafyy Tech</Text>
            </View>
          </View>
          
          <View style={styles.statsGrid}>
            <SmallStat icon="water-outline" label="Moisture" value="68%" />
            <SmallStat icon="thermometer-outline" label="Temp" value="22°C" />
            <SmallStat icon="sunny-outline" label="Sunlight" value="6h" />
          </View>
        </Card>

        {/* Soil Moisture Card */}
        <Card style={styles.moistureCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Soil moisture</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.moistureHeader}>
              <Text variant="h1" style={styles.moistureValue}>68%</Text>
              <TouchableOpacity onPress={handleDetailsPress} style={styles.detailsButton}>
                <Text variant="caption" style={styles.detailsButtonText}>Details</Text>
                <Ionicons name="arrow-up-right" size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={screenWidth - 64}
                height={120}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: 'transparent',
                  backgroundGradientTo: 'transparent',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(229, 243, 229, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, 0.7)`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#E5F3E5',
                  },
                }}
                bezier
                style={styles.chart}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
              />
            </View>
            
            <View style={styles.progressContainer}>
              <Progress value={68} style={styles.progress} />
            </View>
          </CardContent>
        </Card>

        {/* Watering Schedule Card */}
        <Card style={styles.scheduleCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Watering schedule</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="muted" style={styles.scheduleText}>
              Next watering in ~ 6 hours
            </Text>
            <View style={styles.buttonRow}>
              <Button style={styles.primaryButton}>
                <Text variant="body" style={styles.buttonText}>Water now</Text>
              </Button>
              <Button variant="outline" style={styles.secondaryButton}>
                <Text variant="body" style={styles.outlineButtonText}>Adjust</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Plants Section */}
        <View style={styles.plantsSection}>
          <Text variant="h3" style={styles.plantsTitle}>Your plants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plantsScroll}>
            <PlantCard name="Cucumber" status="Thriving" moisture={72} />
            <PlantCard name="Lettuce" status="Stable" moisture={64} />
            <PlantCard name="Beetroot" status="Needs light" moisture={58} />
          </ScrollView>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SmallStat({ icon, label, value }) {
  return (
    <View style={styles.smallStat}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={16} color="#3b82f6" />
        <Text variant="caption" style={styles.statLabel}>{label}</Text>
      </View>
      <Text variant="h3" style={styles.statValue}>{value}</Text>
    </View>
  );
}

function PlantCard({ name, status, moisture }) {
  return (
    <View style={styles.plantCard}>
      <View style={styles.plantHeader}>
        <Text variant="h3" style={styles.plantName}>{name}</Text>
        <View style={styles.moistureBadge}>
          <Text variant="caption" style={styles.moistureBadgeText}>{moisture}%</Text>
        </View>
      </View>
      <Text variant="muted" style={styles.plantStatus}>{status}</Text>
      <View style={styles.plantProgressContainer}>
        <View style={styles.plantProgressBackground}>
          <View style={[styles.plantProgressFill, { width: `${moisture}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  space: {
    gap: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  welcomeCard: {
    marginHorizontal: 0,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    opacity: 0.8,
  },
  welcomeTitle: {
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  smallStat: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statValue: {
    color: '#ffffff',
    fontWeight: '600',
  },
  moistureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  moistureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moistureValue: {
    color: '#ffffff',
    fontWeight: '800',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  chartContainer: {
    height: 120,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  progressContainer: {
    marginTop: 16,
  },
  progress: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scheduleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scheduleText: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    flex: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  outlineButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  plantsSection: {
    gap: 8,
  },
  plantsTitle: {
    color: '#ffffff',
    fontWeight: '600',
  },
  plantsScroll: {
    flexDirection: 'row',
  },
  plantCard: {
    minWidth: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plantName: {
    fontWeight: '600',
    color: '#ffffff',
  },
  moistureBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  moistureBadgeText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  plantStatus: {
    marginBottom: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  plantProgressContainer: {
    marginTop: 12,
  },
  plantProgressBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  plantProgressFill: {
    height: '100%',
    backgroundColor: '#E5F3E5',
    borderRadius: 4,
  },
});

