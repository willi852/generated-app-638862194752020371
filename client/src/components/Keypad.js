import React from 'react';

const Keypad = ({
  onNumberClick,
  onOperationClick,
  onScientificOperation,
  onClear,
  onDecimal,
  scientificMode,
  toggleScientificMode
}) => {
  return (
    <div className="keypad">
      <div className="keypad-row">
        <button className="scientific-toggle" onClick={toggleScientificMode}>
          {scientificMode ? '▼ Sci' : '▲ Sci'}
        </button>
        <button className="clear" onClick={onClear}>C</button>
      </div>
      
      {scientificMode && (
        <div className="scientific-section">
          <button onClick={() => onScientificOperation('sin')}>sin</button>
          <button onClick={() => onScientificOperation('cos')}>cos</button>
          <button onClick={() => onScientificOperation('tan')}>tan</button>
          <button onClick={() => onScientificOperation('log')}>log</button>
          <button onClick={() => onScientificOperation('ln')}>ln</button>
          <button onClick={() => onOperationClick('^')}>^</button>
          <button onClick={() => onScientificOperation('sqrt')}>√</button>
          <button onClick={() => onScientificOperation('factorial')}>x!</button>
        </div>
      )}
      
      <div className="keypad-row">
        <button onClick={() => onNumberClick('7')}>7</button>
        <button onClick={() => onNumberClick('8')}>8</button>
        <button onClick={() => onNumberClick('9')}>9</button>
        <button className="operation" onClick={() => onOperationClick('÷')}>÷</button>
      </div>
      <div className="keypad-row">
        <button onClick={() => onNumberClick('4')}>4</button>
        <button onClick={() => onNumberClick('5')}>5</button>
        <button onClick={() => onNumberClick('6')}>6</button>
        <button className="operation" onClick={() => onOperationClick('×')}>×</button>
      </div>
      <div className="keypad-row">
        <button onClick={() => onNumberClick('1')}>1</button>
        <button onClick={() => onNumberClick('2')}>2</button>
        <button onClick={() => onNumberClick('3')}>3</button>
        <button className="operation" onClick={() => onOperationClick('-')}>-</button>
      </div>
      <div className="keypad-row">
        <button onClick={() => onNumberClick('0')}>0</button>
        <button onClick={onDecimal}>.</button>
        <button className="equals" onClick={() => onOperationClick('=')}>=</button>
        <button className="operation" onClick={() => onOperationClick('+')}>+</button>
      </div>
    </div>
  );
};

export default Keypad;