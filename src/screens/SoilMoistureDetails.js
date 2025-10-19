import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Progress, Text } from '../components/ui';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const detailedChartData = {
  labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
  datasets: [
    {
      data: [45, 52, 58, 62, 65, 68, 70],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

export default function SoilMoistureDetails({ navigation }) {
  const [currentMoisture, setCurrentMoisture] = useState(68);
  const [targetMoisture, setTargetMoisture] = useState(70);
  const [lastWatered, setLastWatered] = useState('2 hours ago');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.space}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text variant="h2" style={styles.headerTitle}>Soil Moisture Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Current Status Card */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusInfo}>
              <Text variant="h1" style={styles.moistureValue}>{currentMoisture}%</Text>
              <Text variant="muted">Current moisture level</Text>
            </View>
            <View style={styles.statusIndicator}>
              <Ionicons 
                name={currentMoisture >= targetMoisture ? "checkmark-circle" : "warning"} 
                size={32} 
                color={currentMoisture >= targetMoisture ? "#10b981" : "#f59e0b"} 
              />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text variant="caption">Target: {targetMoisture}%</Text>
              <Text variant="caption">{currentMoisture >= targetMoisture ? 'Optimal' : 'Needs attention'}</Text>
            </View>
            <Progress value={currentMoisture} style={styles.progress} />
          </View>
        </Card>

        {/* Detailed Chart */}
        <Card style={styles.chartCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">24-Hour Moisture Trend</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.chartContainer}>
              <LineChart
                data={detailedChartData}
                width={screenWidth - 64}
                height={200}
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
                    r: '5',
                    strokeWidth: '2',
                    stroke: '#3b82f6',
                  },
                }}
                bezier
                style={styles.chart}
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLines={true}
                withHorizontalLines={true}
              />
            </View>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <View style={styles.statsGrid}>
          <StatCard 
            title="Last Watered" 
            value={lastWatered} 
            icon="water-outline" 
            color="#3b82f6" 
          />
          <StatCard 
            title="Avg Daily" 
            value="65%" 
            icon="trending-up-outline" 
            color="#10b981" 
          />
          <StatCard 
            title="Peak Today" 
            value="72%" 
            icon="arrow-up-outline" 
            color="#f59e0b" 
          />
          <StatCard 
            title="Low Today" 
            value="58%" 
            icon="arrow-down-outline" 
            color="#ef4444" 
          />
        </View>

        {/* Actions */}
        <Card style={styles.actionsCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Quick Actions</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.buttonRow}>
              <Button style={styles.primaryButton}>
                <Ionicons name="water" size={20} color="#ffffff" />
                <Text variant="body" style={styles.buttonText}>Water Now</Text>
              </Button>
              <Button variant="outline" style={styles.secondaryButton}>
                <Ionicons name="settings-outline" size={20} color="#3b82f6" />
                <Text variant="body" style={styles.outlineButtonText}>Settings</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card style={styles.recommendationsCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Recommendations</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.recommendationItem}>
              <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
              <Text variant="body" style={styles.recommendationText}>
                Your soil moisture is optimal. Consider watering in 4-6 hours.
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <Ionicons name="leaf-outline" size={20} color="#10b981" />
              <Text variant="body" style={styles.recommendationText}>
                Plants are thriving with current moisture levels.
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <Card style={styles.statCard}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <Text variant="caption" style={styles.statTitle}>{title}</Text>
      </View>
      <Text variant="h3" style={styles.statValue}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  space: {
    gap: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  statusCard: {
    backgroundColor: '#ffffff',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusInfo: {
    flex: 1,
  },
  moistureValue: {
    color: '#3b82f6',
    fontWeight: '800',
    marginBottom: 4,
  },
  statusIndicator: {
    padding: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progress: {
    height: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  chartCard: {
    backgroundColor: '#ffffff',
  },
  chartContainer: {
    height: 200,
  },
  chart: {
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statTitle: {
    color: '#6b7280',
  },
  statValue: {
    color: '#1f2937',
    fontWeight: '600',
  },
  actionsCard: {
    backgroundColor: '#ffffff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  outlineButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    color: '#4b5563',
    lineHeight: 20,
  },
});
