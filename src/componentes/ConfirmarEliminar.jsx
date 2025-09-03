import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

export default function ConfirmarEliminar({ label, onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir confirmación */}
      <Button
        isIconOnly
        color="danger"
        variant="light"
        onPress={() => setOpen(true)}
      >
        {/* SVG de eliminar */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>

      {/* Modal de confirmación */}
      <Modal isOpen={open} onOpenChange={setOpen} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirmar eliminación
          </ModalHeader>
          <ModalBody>
            ¿Está seguro que quiere eliminar el defecto <b>{label}?</b>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onConfirm();
                setOpen(false);
              }}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
