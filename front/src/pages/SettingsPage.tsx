import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const token = localStorage.getItem('token'); 

  const saveSettings = async () => {
  try {
    if (!token) {
      alert('You are not authenticated');
      return;
    }

    const payload = {
    name: name,
    email: email,
    password: password ? password : undefined,
}; 

    await axios.put('http://localhost:8000/api/user', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert('Settings saved successfully!');
  } catch (error) {
    console.error('Save settings error:', error.response);
    alert('Failed to save settings. Please try again.');
  }
};

  const savePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill out all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    try {
      await axios.put(
        'http://localhost:8000/api/change-password',
        {
          currentPassword,
          newPassword,
          newPassword_confirmation: confirmPassword, // Laravel needs this
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to update password.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('⚠️ Are you sure you want to permanently delete your account?');
    if (!confirmed) return;

    try {
      await axios.delete('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Account deleted successfully.');
      // Redirect to login or homepage if needed
    } catch (error) {
      console.error(error);
      alert('Failed to delete account.');
    }
  };

  const resetDefaults = () => {
    setEmailNotifications(true);
    setPushNotifications(true);
    setProfileVisibility(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLanguage('English');
    setDarkMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notifications & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex justify-between items-center">
              <Label>Email Notifications</Label>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex justify-between items-center">
              <Label>Push Notifications</Label>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
            <div className="flex justify-between items-center">
              <Label>Dark Mode</Label>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div>
              <Label>Language</Label>
              <select
                className="w-full p-2 border rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Password */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Profile Visibility</Label>
              <Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />
            </div>
            <div className="space-y-2">
              <Label>Change Password</Label>
              <Input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <Input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button className="w-full" onClick={savePassword}>Save Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Save Settings / Reset */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button variant="outline" className="w-full sm:w-auto" onClick={resetDefaults}>
              Reset to Defaults
            </Button>
            <Button className="w-full sm:w-auto" onClick={saveSettings}>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
