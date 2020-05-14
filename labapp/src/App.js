import React from 'react';
import AmazingForm from './components/amazingForm';

const styles = {
  App: {
    backgroundColor: '#fff',
    margin: '0 20%',
  },
}

function App() {
  return (
    <div style={styles.App} className="App">
      <h1 style={{fontFamily: 'Arial'}}>Получение картинки животного</h1>
      <AmazingForm />
    </div>
  );
}

export default App;
