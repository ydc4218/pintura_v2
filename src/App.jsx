import { Tabs, Tab } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';

// Importa tus "páginas"
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Configuracion from './pages/Configuracion';

function App() {
  const tabItems = [
    { id: 'inicio', label: 'Inicio', content: <Inicio /> },
    { id: 'registro', label: 'Registro', content: <Registro /> },
    { id: 'configuracion', label: 'Configuración', content: <Configuracion /> },
  ];

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex justify-center">
        <Tabs aria-label="Tabs de navegación" placement="top">
          {tabItems.map((item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>{item.content}</CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
