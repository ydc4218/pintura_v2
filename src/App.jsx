import { Tabs, Tab } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import IcoTable from './componentes/Icons/Table';
import Add from './componentes/Icons/Add';
import Config from './componentes/Icons/Config';

import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Configuracion from './pages/Configuracion';
import VersionBadge from './VersionBadge';

export default function App() {
  const tabItems = [
    { id: 'inicio', label: 'Inicio', content: <Inicio />, icon: IcoTable },
    { id: 'registro', label: 'Registro', content: <Registro />, icon: Add },
    {
      id: 'configuracion',
      label: 'Configuración',
      content: <Configuracion />,
      icon: Config,
    },
  ];

  return (
    <div className="flex w-full flex-col p-2">
      <div className="flex justify-center">
        <Tabs
          aria-label="Tabs de navegación"
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
      <VersionBadge />
    </div>
  );
}
