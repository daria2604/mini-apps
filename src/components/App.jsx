import { Panel, Tabs, TabsItem } from '@vkontakte/vkui';
import Age from './Age';
import CatFacts from './CatFacts';
import { useState } from 'react';

function App() {
  const [activePanel, setActivePanel] = useState('facts');
  return (
    <>
      <Tabs>
        <TabsItem
          id='tab-facts'
          aria-controls='tab-content-facts'
          selected={activePanel === 'facts'}
          onClick={() => setActivePanel('facts')}
        >
          Факты о кошках
        </TabsItem>

        <TabsItem
          id='tab-age'
          aria-controls='tab-content-age'
          selected={activePanel === 'age'}
          onClick={() => setActivePanel('age')}
        >
          Рассчет возраста по имени
        </TabsItem>
      </Tabs>

      {activePanel === 'facts' && (
        <Panel id='facts'>
          <CatFacts />
        </Panel>
      )}

      {activePanel === 'age' && (
        <Panel id='age'>
          <Age />
        </Panel>
      )}
    </>
  );
}

export default App;
