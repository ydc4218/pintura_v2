import { useEffect, useState } from 'react';
import { Button, Card } from '@heroui/react';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new Event('sw-update'));
  },
  onOfflineReady() {
    console.log('App lista para funcionar sin conexión');
  },
});

export default function UpdatePrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('sw-update', handler);
    return () => window.removeEventListener('sw-update', handler);
  }, []);

  if (!visible) return null;

  return (
    <Card className="fixed bottom-4 right-4 p-4 bg-white shadow-lg">
      <p className="mb-2">
        Hay una nueva versión disponible (<strong>{__APP_VERSION__}</strong>).
      </p>
      <div className="flex gap-2">
        <Button size="sm" color="primary" onPress={() => updateSW(true)}>
          Actualizar
        </Button>
        <Button size="sm" variant="bordered" onPress={() => setVisible(false)}>
          Después
        </Button>
      </div>
    </Card>
  );
}
