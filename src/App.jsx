import { useState } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import IcoTable from './componentes/Icons/Table';
import Add from './componentes/Icons/Add';
import Config from './componentes/Icons/Config';

import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Configuracion from './pages/Configuracion';
import VersionBadge from './VersionBadge';
import BackendStatus from './BackednStatus';

import AlertaSalir from './utils/AlertaSalir';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('registro');
  const [pendingTab, setPendingTab] = useState(null);

  // 👇 estado para controlar si hay cambios en Registro
  const [registroDirty, setRegistroDirty] = useState(false);

  const [alertMessage] = useState(
    'Tienes datos sin guardar. ¿Seguro que quieres salir del Registro?'
  );

  const tabItems = [
    { id: 'inicio', label: 'Inicio', content: <Inicio />, icon: IcoTable },
    {
      id: 'registro',
      label: 'Registro',
      content: <Registro setRegistroDirty={setRegistroDirty} />, // 👈 paso la función
      icon: Add,
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      content: <Configuracion />,
      icon: Config,
    },
  ];

  const handleTabChange = (key) => {
    if (selectedTab === 'registro' && key !== 'registro' && registroDirty) {
      setPendingTab(key);
    } else {
      setSelectedTab(key);
    }
  };

  const confirmChange = () => {
    setSelectedTab(pendingTab);
    setPendingTab(null);
    setRegistroDirty(false); // 👈 limpio el estado
  };

  const cancelChange = () => {
    setPendingTab(null);
  };

  return (
    <div className="flex w-full flex-col p-2">
      <div className="flex justify-center">
        <Tabs
          aria-label="Tabs de navegación"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
          placement="top"
          classNames={{
            tabList:
              'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            tab: 'max-w-fit px-0 h-12',
            tabContent: `
              flex items-center gap-2
              group-data-[selected=true]:text-blue-500
              group-data-[selected=true]:opacity-100
              text-gray-500 opacity-50
            `,
          }}
          variant="underlined"
        >
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tab
                key={item.id}
                title={
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                }
              >
                <Card>
                  <CardBody>{item.content}</CardBody>
                </Card>
              </Tab>
            );
          })}
        </Tabs>
      </div>

      {/* 🔹 Modal de confirmación */}
      <AlertaSalir
        visible={pendingTab !== null} // solo se abre si hay cambio pendiente
        onConfirm={confirmChange}
        onCancel={cancelChange}
        message={alertMessage}
      />

      <VersionBadge />
      <BackendStatus />
    </div>
  );
}
