import React from 'react';
import Navbar from './components/navbar';
import Rodape from './components/rodape';
import './components/style.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <section id="home">
          <h1>Projeto React Native!</h1>
        </section>
      </main>
      <Rodape />
    </div>
  );
}

export default App;