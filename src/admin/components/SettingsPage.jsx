import React, { useEffect, useState } from 'react';
import { Box, H3, H5, Text, Button, Loader, MessageBox } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const api = new ApiClient();

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.resourceAction({
        resourceId: 'Setting',
        actionName: 'list',
      });
      setSettings(response.data.records || []);
    } catch (err) {
      setMessage({ type: 'error', content: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box variant="white" p="xxl">
        <Loader />
      </Box>
    );
  }

  return (
    <Box>
      <H3 mb="xl">System Settings</H3>

      {message && (
        <MessageBox
          mb="xl"
          message={message.content}
          variant={message.type}
          onCloseClick={() => setMessage(null)}
        />
      )}

      <Box variant="white" p="xl" border="default" borderRadius="lg">
        <H5 mb="default">Configuration Settings</H5>
        <Text fontSize="sm" color="grey80" mb="xl">
          Manage your system configuration key-value pairs. These settings control
          various aspects of your eCommerce application.
        </Text>

        {settings.length === 0 ? (
          <Text fontSize="sm" color="grey60">
            No settings configured yet. Add settings from the Settings resource.
          </Text>
        ) : (
          <Box>
            {settings.map((setting) => (
              <Box
                key={setting.id}
                p="default"
                mb="default"
                border="default"
                borderRadius="default"
                bg="grey20"
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontWeight="bold" fontSize="default">
                      {setting.params.key}
                    </Text>
                    <Text fontSize="sm" color="grey60" mt="sm">
                      {setting.params.description || 'No description'}
                    </Text>
                    <Text fontSize="sm" color="grey80" mt="sm">
                      Value: <strong>{setting.params.value}</strong>
                    </Text>
                    <Text fontSize="xs" color="grey60" mt="sm">
                      Type: {setting.params.type} | Public: {setting.params.isPublic ? 'Yes' : 'No'}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Box mt="xl">
          <Button
            as="a"
            href="/admin/resources/Setting"
            variant="primary"
          >
            Manage Settings
          </Button>
        </Box>
      </Box>

      {/* Settings Categories */}
      <Box variant="white" mt="xl" p="xl" border="default" borderRadius="lg">
        <H5 mb="default">Setting Categories</H5>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gridGap="default"
          mt="default"
        >
          <Box p="default" border="default" borderRadius="default">
            <Text fontWeight="bold" fontSize="sm">General</Text>
            <Text fontSize="xs" color="grey60" mt="sm">
              Site name, logo, contact info
            </Text>
          </Box>
          <Box p="default" border="default" borderRadius="default">
            <Text fontWeight="bold" fontSize="sm">Email</Text>
            <Text fontSize="xs" color="grey60" mt="sm">
              SMTP, notification settings
            </Text>
          </Box>
          <Box p="default" border="default" borderRadius="default">
            <Text fontWeight="bold" fontSize="sm">Payment</Text>
            <Text fontSize="xs" color="grey60" mt="sm">
              Payment gateway configs
            </Text>
          </Box>
          <Box p="default" border="default" borderRadius="default">
            <Text fontWeight="bold" fontSize="sm">Shipping</Text>
            <Text fontSize="xs" color="grey60" mt="sm">
              Shipping methods, rates
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
