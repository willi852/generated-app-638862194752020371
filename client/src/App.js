import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [storedValue, setStoredValue] = useState(null);
  const [scientificMode, setScientificMode] = useState(false);

  const handleNumberClick = (number) => {
    if (display === '0' || (storedValue !== null && display === storedValue.toString())) {
      setDisplay(number);
    } else {
      setDisplay(prev => prev + number);
    }
  };

  const handleOperationClick = (op) => {
    if (op === '=') {
      calculate(storedValue, parseFloat(display), operation);
      setOperation(null);
    } else {
      setOperation(op);
      setStoredValue(parseFloat(display));
      setDisplay('0');
    }
  };

  const handleScientificOperation = async (op) => {
    const value = parseFloat(display);
    
    try {
      const response = await fetch('/api/scientific', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: op, value })
      });
      
      const data = await response.json();
      setDisplay(data.result.toString());
    } catch (error) {
      console.error('Error:', error);
      setDisplay('Error');
    }
  };

  const calculate = async (val1, val2, op) => {
    let expression;
    switch (op) {
      case '+':
        expression = `${val1} + ${val2}`;
        break;
      case '-':
        expression = `${val1} - ${val2}`;
        break;
      case '×':
        expression = `${val1} * ${val2}`;
        break;
      case '÷':
        expression = `${val1} / ${val2}`;
        break;
      case '^':
        expression = `Math.pow(${val1}, ${val2})`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression })
      });
      
      const data = await response.json();
      setDisplay(data.result.toString());
      setStoredValue(data.result);
    } catch (error) {
      console.error('Error:', error);
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setStoredValue(null);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  };

  const toggleScientificMode = () => {
    setScientificMode(prev => !prev);
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <Keypad
        onNumberClick={handleNumberClick}
        onOperationClick={handleOperationClick}
        onScientificOperation={handleScientificOperation}
        onClear={handleClear}
        onDecimal={handleDecimal}
        scientificMode={scientificMode}
        toggleScientificMode={toggleScientificMode}
      />
    </div>
  );
}

export default App;