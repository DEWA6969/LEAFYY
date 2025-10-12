import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Text } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const { logout, user: contextUser } = useAuth();
  const navigation = useNavigation();
  const [user, setUser] = useState(contextUser);

  // Force load user dari AsyncStorage
  useEffect(() => {
    loadUserData();
  }, [contextUser]);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log('✅ Loaded user from storage:', parsedUser);
        setUser(parsedUser);
      } else if (contextUser) {
        console.log('✅ Using user from context:', contextUser);
        setUser(contextUser);
      } else {
        console.log('❌ No user data found');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Account Section */}
        <Card style={styles.sectionCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Account</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Ionicons name="person-circle-outline" size={60} color="#10b981" />
              </View>
              <View style={styles.userDetails}>
                <Text variant="h3" style={styles.username}>
                  {user && user.username ? user.username : 'User'}
                </Text>
                <Text variant="caption" style={styles.userEmail}>
                  {user && user.email ? user.email : 'user@example.com'}
                </Text>
                {(!user || !user.username) && (
                  <Text variant="caption" style={styles.notLoggedIn}>
                    Silakan login untuk melihat data
                  </Text>
                )}
              </View>
            </View>
            <SettingItem
              icon="person-outline"
              title="View Profile"
              subtitle="See your account information"
              onPress={() => navigation.navigate('Account')}
            />
            <SettingItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Configure notification preferences"
              onPress={() => {}}
            />
            <SettingItem
              icon="shield-outline"
              title="Privacy & Security"
              subtitle="Control your privacy settings"
              onPress={() => {}}
            />
            <SettingItem
              icon="log-out-outline"
              title="Logout"
              subtitle="Sign out from your account"
              onPress={handleLogout}
              isDestructive={true}
            />
          </CardContent>
        </Card>

        {/* Garden Settings */}
        <Card style={styles.sectionCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Garden</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon="leaf-outline"
              title="Plant Library"
              subtitle="Manage your plant database"
              onPress={() => {}}
            />
            <SettingItem
              icon="water-outline"
              title="Watering Schedule"
              subtitle="Set up automatic watering"
              onPress={() => {}}
            />
            <SettingItem
              icon="sunny-outline"
              title="Light Requirements"
              subtitle="Configure light settings"
              onPress={() => {}}
            />
          </CardContent>
        </Card>

        {/* Device Settings */}
        <Card style={styles.sectionCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Devices</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon="bluetooth-outline"
              title="Bluetooth"
              subtitle="Manage device connections"
              onPress={() => {}}
            />
            <SettingItem
              icon="wifi-outline"
              title="WiFi Settings"
              subtitle="Configure network settings"
              onPress={() => {}}
            />
            <SettingItem
              icon="battery-half-outline"
              title="Battery Management"
              subtitle="Monitor device battery levels"
              onPress={() => {}}
            />
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card style={styles.sectionCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">App</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SettingItemWithToggle
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              value={false}
              onValueChange={() => {}}
            />
            <SettingItemWithToggle
              icon="location-outline"
              title="Location Services"
              subtitle="Allow location access"
              value={true}
              onValueChange={() => {}}
            />
            <SettingItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => {}}
            />
            <SettingItem
              icon="information-circle-outline"
              title="About"
              subtitle="App version and information"
              onPress={() => {}}
            />
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

function SettingItem({ icon, title, subtitle, onPress, isDestructive = false }) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color={isDestructive ? "#ef4444" : "#6b7280"} />
      </View>
      <View style={styles.settingContent}>
        <Text variant="body" style={[styles.settingTitle, isDestructive && styles.destructiveText]}>{title}</Text>
        <Text variant="muted" style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );
}

function SettingItemWithToggle({ icon, title, subtitle, value, onValueChange }) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color="#6b7280" />
      </View>
      <View style={styles.settingContent}>
        <Text variant="body" style={styles.settingTitle}>{title}</Text>
        <Text variant="muted" style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
        thumbColor={value ? '#ffffff' : '#f3f4f6'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    color: '#1f2937',
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    color: '#1f2937',
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  userAvatar: {
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#1f2937',
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#6b7280',
    fontSize: 13,
  },
  notLoggedIn: {
    color: '#ef4444',
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
  destructiveText: {
    color: '#ef4444',
  },
});

