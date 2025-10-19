import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Text } from '../components/ui';
import { useTheme } from '../context/ThemeContext';

export default function Devices() {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>Devices</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Connected Devices */}
        <Card style={styles.deviceCard}>
          <CardHeader>
            <CardTitle>
              <View style={styles.deviceHeader}>
                <Ionicons name="hardware-chip" size={20} color="#ffffff" />
                <Text variant="h3" style={styles.deviceTitle}>Soil Moisture Sensor</Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.deviceInfo}>
              <View style={styles.statusRow}>
                <View style={styles.statusIndicator} />
                <Text variant="body" style={styles.statusText}>Connected</Text>
              </View>
              <Text variant="muted" style={styles.deviceLocation}>Garden Bed 1</Text>
              <Text variant="muted" style={styles.lastUpdate}>Last update: 2 minutes ago</Text>
            </View>
            <View style={styles.deviceActions}>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption" style={styles.actionButtonText}>Settings</Text>
              </Button>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption" style={styles.actionButtonText}>Analytics</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.deviceCard}>
          <CardHeader>
            <CardTitle>
              <View style={styles.deviceHeader}>
                <Ionicons name="thermometer" size={20} color="#ffffff" />
                <Text variant="h3" style={styles.deviceTitle}>Temperature Sensor</Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.deviceInfo}>
              <View style={styles.statusRow}>
                <View style={[styles.statusIndicator, { backgroundColor: '#f59e0b' }]} />
                <Text variant="body" style={styles.statusText}>Low Battery</Text>
              </View>
              <Text variant="muted" style={styles.deviceLocation}>Garden Bed 2</Text>
              <Text variant="muted" style={styles.lastUpdate}>Last update: 15 minutes ago</Text>
            </View>
            <View style={styles.deviceActions}>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption" style={styles.actionButtonText}>Settings</Text>
              </Button>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption" style={styles.actionButtonText}>Replace Battery</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Add New Device */}
        <Card style={styles.addDeviceCard}>
          <CardContent>
            <View style={styles.addDeviceContent}>
              <Ionicons name="add-circle-outline" size={48} color="rgba(255, 255, 255, 0.7)" />
              <Text variant="h3" style={styles.addDeviceTitle}>Add New Device</Text>
              <Text variant="muted" style={styles.addDeviceDescription}>
                Connect a new sensor to monitor your plants
              </Text>
              <Button style={styles.connectButton}>
                <Text variant="body" style={styles.connectButtonText}>Connect Device</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
  },
  addButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  deviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceTitle: {
    color: '#ffffff',
  },
  deviceInfo: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  deviceLocation: {
    marginBottom: 4,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lastUpdate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  deviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  addDeviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addDeviceContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  addDeviceTitle: {
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  addDeviceDescription: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  connectButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
  },
  connectButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

