import React from 'react';
import SlideOnClick from './components/slideOnClick';
import './stylesheets/reset.css';
import './stylesheets/App.css';
import SlideOnClickReset from './components/slideOnClickReset';

function App() {
  return (
    <div className="App">
      <SlideOnClick />
      <SlideOnClickReset />
    </div>
  );
}

export default App;
