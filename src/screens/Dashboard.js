import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Progress, Text } from '../components/ui';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [58, 60, 62, 61, 65, 67, 70],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export default function Dashboard() {
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.space}>
        {/* Welcome Section */}
        <Card style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text variant="caption" style={styles.welcomeSubtitle}>Welcome back</Text>
              <Text variant="h2" style={styles.welcomeTitle}>Hi, Alfi</Text>
            </View>
            <View style={styles.statusBadge}>
              <Ionicons name="leaf-outline" size={16} color="#3b82f6" />
              <Text variant="caption" style={styles.statusText}>Healthy garden</Text>
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
              <Button size="sm" variant="outline" style={styles.detailsButton}>
                <Text variant="caption">Details</Text>
                <Ionicons name="arrow-up-right" size={16} color="#3b82f6" />
              </Button>
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
                  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#3b82f6',
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
  space: {
    gap: 20,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    color: '#6b7280',
  },
  welcomeTitle: {
    color: '#3b82f6',
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  smallStat: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#6b7280',
  },
  statValue: {
    color: '#1f2937',
    fontWeight: '600',
  },
  moistureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  moistureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moistureValue: {
    color: '#3b82f6',
    fontWeight: '800',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  scheduleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    color: '#3b82f6',
    fontWeight: '600',
  },
  plantsScroll: {
    flexDirection: 'row',
  },
  plantCard: {
    minWidth: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plantName: {
    fontWeight: '600',
  },
  moistureBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  moistureBadgeText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  plantStatus: {
    marginBottom: 12,
  },
  plantProgressContainer: {
    marginTop: 12,
  },
  plantProgressBackground: {
    height: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  plantProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
});

