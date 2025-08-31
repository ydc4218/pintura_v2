import { Alert, Button } from '@heroui/react';

export default function AlertaSalir({ visible, onConfirm, onCancel, message }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-sm space-y-4">
        <Alert
          title="Advertencia"
          description={
            message ||
            'Tienes datos sin guardar. ¿Estás seguro que quieres cambiar de pestaña?'
          }
          color="danger"
        />

        <div className="flex justify-end gap-2">
          <Button color="danger" onPress={onCancel}>
            Cancelar
          </Button>
          <Button color="success" onPress={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
