import React from 'react';
import './stylesheets/reset.css';
import './stylesheets/App.css';
import SlideOnClick from './components/SlideOnClick';
import SlideOnClickReset from './components/SlideOnClickReset';
import LoopOnClick from './components/LoopOnClick';
import LoopWithCancel from './components/LoopWithCancel';
import MultiPartAnimation from './components/MultiPartAnimation';
import TransitionArray from './components/TransitionArray';
import Bouncer from './components/Bouncer';
import Subsequent from './components/Subsequent';
import SubsequentManual from './components/SubsequentManual';
import SubsequentManualRadio from './components/SubsequentManualRadio';
import Conveyer from './components/Conveyer';
import ConveyerBroken from './components/ConveyerBroken';
import ConveyerMultiple from './components/ConveyerMultiple';
import ConveyerSingle from './components/ConveyerSingle';

function App() {
  return (
    <div className="App">
      <SlideOnClick />
      <SlideOnClickReset />
      <LoopOnClick />
      <LoopWithCancel />
      <Bouncer />
      <MultiPartAnimation />
      <TransitionArray />
      <Subsequent />
      <SubsequentManual />
      <SubsequentManualRadio />
      <Conveyer />
      <ConveyerBroken />
      <ConveyerSingle />
      <ConveyerMultiple />
    </div>
  );
}

export default App;
