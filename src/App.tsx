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
    </div>
  );
}

export default App;
