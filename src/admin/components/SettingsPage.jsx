import { useEffect, useState } from 'react';
import { Box, H3, Text, Button, Loader, MessageBox } from '@adminjs/design-system';
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="xl">
        <H3>Settings</H3>
        <Button
          as="a"
          href="/admin/resources/Setting/actions/new"
          variant="primary"
          size="sm"
        >
          Add New Setting
        </Button>
      </Box>

      {message && (
        <MessageBox
          mb="xl"
          message={message.content}
          variant={message.type}
          onCloseClick={() => setMessage(null)}
        />
      )}

      <Box variant="white" p="xxl" borderRadius="lg">
        {settings.length === 0 ? (
          <Box textAlign="center" py="xxl">
            <Text fontSize="lg" color="grey60" mb="lg">
              No settings configured
            </Text>
            <Button
              as="a"
              href="/admin/resources/Setting/actions/new"
              variant="primary"
            >
              Create First Setting
            </Button>
          </Box>
        ) : (
          <Box>
            {settings.map((setting) => (
              <Box
                key={setting.id}
                p="lg"
                mb="lg"
                border="default"
                borderRadius="default"
                bg="white"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex="1">
                    <Box display="flex" alignItems="center" mb="sm">
                      <Text fontWeight="bold" fontSize="lg" mr="default">
                        {setting.params.key}
                      </Text>
                      <Box
                        px="default"
                        py="sm"
                        bg="grey20"
                        borderRadius="default"
                        mr="sm"
                      >
                        <Text fontSize="xs" color="grey80">
                          {setting.params.type}
                        </Text>
                      </Box>
                      {setting.params.isPublic && (
                        <Box
                          px="default"
                          py="sm"
                          bg="primary"
                          borderRadius="default"
                        >
                          <Text fontSize="xs" color="white">
                            Public
                          </Text>
                        </Box>
                      )}
                    </Box>
                    <Text fontSize="sm" color="grey60" mb="default">
                      {setting.params.description}
                    </Text>
                    <Box p="default" bg="grey20" borderRadius="default" mt="default">
                      <Text fontSize="sm" fontFamily="monospace" color="grey100">
                        {setting.params.value}
                      </Text>
                    </Box>
                  </Box>
                  <Box ml="lg">
                    <Button
                      as="a"
                      href={`/admin/resources/Setting/records/${setting.id}/edit`}
                      variant="light"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SettingsPage;
