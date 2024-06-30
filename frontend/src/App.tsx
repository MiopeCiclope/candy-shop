import styled from '@emotion/styled';
import { useState } from 'react';
import './App.css';
import CandyList from './components/candy-list/candy-list';
import ControlButton from './components/control-button/control-button';
import { Candy } from './models/candy-model';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 100px 8fr;
  grid-template-columns: repeat(3, auto);
  width: 900px;

  @media (max-width: 768px) {
    width:100%;
    height:100%;
  }
`

function App() {
  const [aggregateKey, setAggregateKey] = useState<keyof Candy | null>(null)

  return (
    <div className="App">
      <Wrapper>
        <ControlButton text="Raw Data" onClick={() => setAggregateKey(null)} isActive={aggregateKey === null} />
        <ControlButton text="Aggregate by Client" onClick={() => setAggregateKey("name")} isActive={aggregateKey === "name"} />
        <ControlButton text="Aggregate by Candy" onClick={() => setAggregateKey("candy")} isActive={aggregateKey === "candy"} />
        <CandyList aggregateKey={aggregateKey} />
      </Wrapper>
    </div>
  );
}

export default App;
