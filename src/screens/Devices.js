import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Text } from '../components/ui';

export default function Devices() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>Devices</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Connected Devices */}
        <Card style={styles.deviceCard}>
          <CardHeader>
            <CardTitle>
              <View style={styles.deviceHeader}>
                <Ionicons name="hardware-chip" size={20} color="#3b82f6" />
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
                <Text variant="caption">Settings</Text>
              </Button>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption">Analytics</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.deviceCard}>
          <CardHeader>
            <CardTitle>
              <View style={styles.deviceHeader}>
                <Ionicons name="thermometer" size={20} color="#3b82f6" />
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
                <Text variant="caption">Settings</Text>
              </Button>
              <Button variant="outline" size="sm" style={styles.actionButton}>
                <Text variant="caption">Replace Battery</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Add New Device */}
        <Card style={styles.addDeviceCard}>
          <CardContent>
            <View style={styles.addDeviceContent}>
              <Ionicons name="add-circle-outline" size={48} color="#6b7280" />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    color: '#1f2937',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceTitle: {
    color: '#1f2937',
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
    color: '#1f2937',
    fontWeight: '500',
  },
  deviceLocation: {
    marginBottom: 4,
  },
  lastUpdate: {
    fontSize: 12,
  },
  deviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  addDeviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  addDeviceContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  addDeviceTitle: {
    color: '#1f2937',
    marginTop: 12,
    marginBottom: 8,
  },
  addDeviceDescription: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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

