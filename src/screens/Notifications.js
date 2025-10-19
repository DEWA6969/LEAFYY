import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Button, Text } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import notificationService from '../services/notificationService';

export default function Notifications() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
    loadScheduledNotifications();
  }, []);

  const loadNotifications = () => {
    // Mock notifications for testing
    const mockNotifications = [
      {
        id: '1',
        title: '💧 Watering Reminder',
        body: "It's time to water your Tomato plant!",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        type: 'watering',
        read: false,
      },
      {
        id: '2',
        title: '⚠️ Low Moisture Alert',
        body: 'Lettuce moisture is at 45%. Consider watering soon.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        type: 'moisture',
        read: false,
      },
      {
        id: '3',
        title: '📡 Device Offline',
        body: 'Soil Moisture Sensor has gone offline. Please check the connection.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        type: 'device',
        read: true,
      },
      {
        id: '4',
        title: '🔋 Low Battery',
        body: 'Temperature Sensor battery is running low. Please replace or charge.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        type: 'battery',
        read: true,
      },
    ];
    setNotifications(mockNotifications);
  };

  const loadScheduledNotifications = async () => {
    try {
      const scheduled = await notificationService.getScheduledNotifications();
      setScheduledNotifications(scheduled);
    } catch (error) {
      console.error('Error loading scheduled notifications:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      const notificationId = await notificationService.sendTestNotification();
      if (notificationId) {
        Alert.alert('Success', 'Test notification sent!');
        loadScheduledNotifications();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const sendWateringReminder = async () => {
    try {
      const notificationId = await notificationService.sendWateringReminder('Tomato');
      if (notificationId) {
        Alert.alert('Success', 'Watering reminder scheduled!');
        loadScheduledNotifications();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const sendLowMoistureAlert = async () => {
    try {
      const notificationId = await notificationService.sendLowMoistureAlert('Lettuce', 35);
      if (notificationId) {
        Alert.alert('Success', 'Low moisture alert sent!');
        loadScheduledNotifications();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await notificationService.cancelAllNotifications();
      Alert.alert('Success', 'All notifications cancelled!');
      loadScheduledNotifications();
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel notifications');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'watering':
        return 'water-outline';
      case 'moisture':
        return 'warning-outline';
      case 'device':
        return 'hardware-chip-outline';
      case 'battery':
        return 'battery-half-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'watering':
        return '#3b82f6';
      case 'moisture':
        return '#f59e0b';
      case 'device':
        return '#ef4444';
      case 'battery':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="h2" style={[styles.title, { color: colors.text }]}>Notifications</Text>
        <TouchableOpacity onPress={cancelAllNotifications} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Test Notifications */}
        <Card style={[styles.testCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3" style={{ color: colors.text }}>Test Notifications</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.testButtons}>
              <Button style={[styles.testButton, { backgroundColor: colors.primary }]} onPress={sendTestNotification}>
                <Text variant="body" style={styles.testButtonText}>Send Test</Text>
              </Button>
              <Button style={[styles.testButton, { backgroundColor: colors.primary }]} onPress={sendWateringReminder}>
                <Text variant="body" style={styles.testButtonText}>Watering Alert</Text>
              </Button>
              <Button style={[styles.testButton, { backgroundColor: colors.primary }]} onPress={sendLowMoistureAlert}>
                <Text variant="body" style={styles.testButtonText}>Moisture Alert</Text>
              </Button>
            </View>
            <Text variant="caption" style={[styles.testDescription, { color: colors.textSecondary }]}>
              Tap buttons to test different notification types
            </Text>
          </CardContent>
        </Card>

        {/* Scheduled Notifications */}
        {scheduledNotifications.length > 0 && (
          <Card style={[styles.scheduledCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <CardHeader>
              <CardTitle>
                <Text variant="h3" style={{ color: colors.text }}>Scheduled ({scheduledNotifications.length})</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledNotifications.map((notification, index) => (
                <View key={index} style={styles.scheduledItem}>
                  <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                  <Text variant="caption" style={[styles.scheduledText, { color: colors.textSecondary }]}>
                    {notification.content.title}
                  </Text>
                </View>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Notifications */}
        <Card style={[styles.notificationsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3" style={{ color: colors.text }}>Recent Notifications</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.map((notification) => (
              <TouchableOpacity key={notification.id} style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  <Ionicons 
                    name={getNotificationIcon(notification.type)} 
                    size={20} 
                    color={getNotificationColor(notification.type)} 
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text variant="body" style={[styles.notificationTitle, { color: colors.text }]}>
                    {notification.title}
                  </Text>
                  <Text variant="caption" style={[styles.notificationBody, { color: colors.textSecondary }]}>
                    {notification.body}
                  </Text>
                  <Text variant="caption" style={[styles.notificationTime, { color: colors.textMuted }]}>
                    {formatTimestamp(notification.timestamp)}
                  </Text>
                </View>
                {!notification.read && (
                  <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
                )}
              </TouchableOpacity>
            ))}
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
    fontWeight: '700',
  },
  clearButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  testCard: {
    borderWidth: 1,
  },
  testButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  testButton: {
    flex: 1,
    minWidth: '30%',
  },
  testButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  testDescription: {
    textAlign: 'center',
  },
  scheduledCard: {
    borderWidth: 1,
  },
  scheduledItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  scheduledText: {
    flex: 1,
  },
  notificationsCard: {
    borderWidth: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationBody: {
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
});
