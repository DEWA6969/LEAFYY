import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  constructor() {
    this.notificationListener = null;
    this.responseListener = null;
  }

  // Request notification permissions
  async requestPermissions() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('❌ Notification permission denied');
        return false;
      }

      console.log('✅ Notification permissions granted');
      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  // Schedule a local notification
  async scheduleNotification(title, body, data = {}) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: null, // Show immediately
      });

      console.log('📱 Notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  // Schedule a delayed notification
  async scheduleDelayedNotification(title, body, seconds, data = {}) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: { seconds },
      });

      console.log('⏰ Delayed notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling delayed notification:', error);
      return null;
    }
  }

  // Cancel a notification
  async cancelNotification(notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log('❌ Notification cancelled:', notificationId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  }

  // Cancel all notifications
  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('❌ All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling all notifications:', error);
    }
  }

  // Get all scheduled notifications
  async getScheduledNotifications() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      console.log('📋 Scheduled notifications:', notifications);
      return notifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  // Test notification - for testing purposes
  async sendTestNotification() {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Notification permissions not granted');
    }

    return await this.scheduleNotification(
      '🌱 Leafyy Tech Test',
      'This is a test notification from your smart garden app!',
      { type: 'test', timestamp: Date.now() }
    );
  }

  // Garden-specific notifications
  async sendWateringReminder(plantName) {
    return await this.scheduleNotification(
      '💧 Watering Reminder',
      `It's time to water your ${plantName}!`,
      { type: 'watering', plant: plantName }
    );
  }

  async sendLowMoistureAlert(plantName, moistureLevel) {
    return await this.scheduleNotification(
      '⚠️ Low Moisture Alert',
      `${plantName} moisture is at ${moistureLevel}%. Consider watering soon.`,
      { type: 'moisture', plant: plantName, level: moistureLevel }
    );
  }

  async sendDeviceOfflineAlert(deviceName) {
    return await this.scheduleNotification(
      '📡 Device Offline',
      `${deviceName} has gone offline. Please check the connection.`,
      { type: 'device', device: deviceName }
    );
  }

  async sendBatteryLowAlert(deviceName) {
    return await this.scheduleNotification(
      '🔋 Low Battery',
      `${deviceName} battery is running low. Please replace or charge.`,
      { type: 'battery', device: deviceName }
    );
  }

  // Set up notification listeners
  setupListeners(onNotificationReceived, onNotificationResponse) {
    // Listen for notifications received while app is running
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('📱 Notification received:', notification);
      if (onNotificationReceived) {
        onNotificationReceived(notification);
      }
    });

    // Listen for user interactions with notifications
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notification response:', response);
      if (onNotificationResponse) {
        onNotificationResponse(response);
      }
    });
  }

  // Clean up listeners
  cleanup() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }
}

export default new NotificationService();
