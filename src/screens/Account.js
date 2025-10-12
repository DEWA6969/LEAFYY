import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardContent, CardTitle, Text } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account({ navigation }) {
  const { user: contextUser } = useAuth();
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
        console.log('✅ Account - Loaded user:', parsedUser);
        setUser(parsedUser);
      } else if (contextUser) {
        setUser(contextUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text variant="h2" style={styles.title}>Account</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Card */}
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <CardContent>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={60} color="#10b981" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text variant="h2" style={styles.displayName}>
                {user?.name || user?.username || 'User'}
              </Text>
              <Text variant="caption" style={styles.memberSince}>
                Member since {user?.created_at ? new Date(user.created_at).getFullYear() : '2025'}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card style={styles.detailsCard}>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Account Information</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Username */}
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="person-outline" size={20} color="#10b981" />
              </View>
              <View style={styles.infoContent}>
                <Text variant="caption" style={styles.infoLabel}>Username</Text>
                <Text variant="body" style={styles.infoValue}>
                  {user?.username || 'Not set'}
                </Text>
              </View>
            </View>

            {/* Email */}
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="mail-outline" size={20} color="#10b981" />
              </View>
              <View style={styles.infoContent}>
                <Text variant="caption" style={styles.infoLabel}>Email</Text>
                <Text variant="body" style={styles.infoValue}>
                  {user?.email || 'Not set'}
                </Text>
              </View>
            </View>

            {/* Full Name */}
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="person-circle-outline" size={20} color="#10b981" />
              </View>
              <View style={styles.infoContent}>
                <Text variant="caption" style={styles.infoLabel}>Full Name</Text>
                <Text variant="body" style={styles.infoValue}>
                  {user?.name || 'Not set'}
                </Text>
              </View>
            </View>

            {/* Account Status */}
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#10b981" />
              </View>
              <View style={styles.infoContent}>
                <Text variant="caption" style={styles.infoLabel}>Account Status</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text variant="body" style={styles.statusText}>
                    {user?.is_verified ? 'Verified' : 'Not Verified'}
                  </Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card style={styles.actionsCard}>
          <CardContent>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="create-outline" size={20} color="#10b981" />
              <Text variant="body" style={styles.actionButtonText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="lock-closed-outline" size={20} color="#10b981" />
              <Text variant="body" style={styles.actionButtonText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: '#1f2937',
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#10b981',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  displayName: {
    color: '#1f2937',
    fontWeight: '700',
    marginBottom: 4,
  },
  memberSince: {
    color: '#6b7280',
    fontSize: 13,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#1f2937',
    fontWeight: '500',
    fontSize: 15,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    color: '#10b981',
    fontWeight: '500',
  },
  actionsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionButtonText: {
    flex: 1,
    color: '#1f2937',
    fontWeight: '500',
    marginLeft: 12,
  },
});

