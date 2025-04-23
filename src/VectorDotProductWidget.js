import React from 'react';
import './App.css';
import VectorDotProductWidget from './VectorDotProductWidget';
import { useState, useEffect } from 'react';

export default function VectorDotProductWidget() {
  // Three editable X vectors with initial random values
  const [xVectors, setXVectors] = useState([
    // X1
    [
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5
    ],
    // X2
    [
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5
    ],
    // X3
    [
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5
    ]
  ]);
  
  // User-adjustable vector y with initial random values
  const [yVector, setYVector] = useState([
    Math.floor(Math.random() * 10) - 5,
    Math.floor(Math.random() * 10) - 5,
    Math.floor(Math.random() * 10) - 5
  ]);
  
  // Individual dot products and average
  const [dotProducts, setDotProducts] = useState([0, 0, 0]);
  const [averageDotProduct, setAverageDotProduct] = useState(0);
  
  // Color for the average dot product box
  const [resultColor, setResultColor] = useState('bg-green-500');
  
  // Calculate dot products and average whenever vectors change
  useEffect(() => {
    const products = xVectors.map(xVector => 
      xVector.reduce((sum, value, index) => sum + value * yVector[index], 0)
    );
    
    setDotProducts(products);
    
    const average = products.reduce((sum, value) => sum + value, 0) / products.length;
    setAverageDotProduct(average);
    
    // Set color based on average result value
    if (average === 0) {
      setResultColor('bg-green-500'); // Green for zero
    } else if (average > 0) {
      // Red gradient for positive values
      const intensity = Math.min(Math.abs(average) / 25, 1); // Normalize to 0-1 range
      if (intensity > 0.8) {
        setResultColor('bg-red-600');
      } else if (intensity > 0.6) {
        setResultColor('bg-red-500');
      } else if (intensity > 0.4) {
        setResultColor('bg-red-400');
      } else if (intensity > 0.2) {
        setResultColor('bg-red-300');
      } else {
        setResultColor('bg-red-200');
      }
    } else {
      // Blue gradient for negative values
      const intensity = Math.min(Math.abs(average) / 25, 1); // Normalize to 0-1 range
      if (intensity > 0.8) {
        setResultColor('bg-blue-600');
      } else if (intensity > 0.6) {
        setResultColor('bg-blue-500');
      } else if (intensity > 0.4) {
        setResultColor('bg-blue-400');
      } else if (intensity > 0.2) {
        setResultColor('bg-blue-300');
      } else {
        setResultColor('bg-blue-200');
      }
    }
  }, [xVectors, yVector]);
  
  // Handle X vector input changes
  const handleXInputChange = (vectorIndex, elementIndex, value) => {
    // Create a copy of xVectors
    const newXVectors = [...xVectors];
    // Update the specific element in the specific vector
    // Ensure the value is a number and clamped between -10 and 10
    const numValue = Math.max(-10, Math.min(10, Number(value) || 0));
    newXVectors[vectorIndex][elementIndex] = numValue;
    // Update state
    setXVectors(newXVectors);
  };
  
  // Handle Y vector slider changes
  const handleYSliderChange = (index, value) => {
    const newYVector = [...yVector];
    newYVector[index] = Number(value);
    setYVector(newYVector);
  };
  
  // Handle Y vector input changes
  const handleYInputChange = (index, value) => {
    const newYVector = [...yVector];
    // Ensure the value is a number and clamped between -10 and 10
    const numValue = Math.max(-10, Math.min(10, Number(value) || 0));
    newYVector[index] = numValue;
    setYVector(newYVector);
  };
  
  // Randomize all vectors
  const randomizeVectors = () => {
    // Generate new random X vectors
    const newXVectors = xVectors.map(() => [
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5
    ]);
    
    // Generate new random Y vector
    const newYVector = [
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5,
      Math.floor(Math.random() * 10) - 5
    ];
    
    // Update state
    setXVectors(newXVectors);
    setYVector(newYVector);
  };
  
  return (
    <div className="flex flex-col items-center p-8 max-w-xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Vector Dot Product Calculator</h2>
      
      <div className="flex justify-between w-full mb-8">
        {/* Editable X vectors */}
        <div className="w-1/2 bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">X Vectors</h3>
          <div className="flex justify-between gap-2">
            {xVectors.map((xVector, vectorIndex) => (
              <div key={`vector-${vectorIndex}`} className="flex-1">
                <h4 className="text-center font-semibold mb-2">X{vectorIndex + 1}</h4>
                <div className="flex flex-col gap-3">
                  {xVector.map((value, elementIndex) => (
                    <div key={`x-${vectorIndex}-${elementIndex}`} className="flex">
                      <input
                        type="number"
                        min="-10"
                        max="10"
                        value={value}
                        onChange={(e) => handleXInputChange(vectorIndex, elementIndex, e.target.value)}
                        className="w-full bg-white p-2 rounded text-center font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-center bg-blue-200 p-1 rounded font-mono text-sm">
                  Dot: {dotProducts[vectorIndex]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Average dot product result */}
        <div className="w-1/4 flex flex-col items-center justify-center">
          <div className={`${resultColor} p-4 rounded-lg w-24 h-24 flex items-center justify-center transition-colors duration-300`}>
            <span className="text-xl font-bold text-white text-center">
              {averageDotProduct.toFixed(2)}
            </span>
          </div>
          <div className="mt-2 text-center text-sm">Average</div>
          <button 
            onClick={randomizeVectors}
            className="mt-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm font-medium"
          >
            Randomize All
          </button>
        </div>
        
        {/* Adjustable vector Y */}
        <div className="w-1/4 bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">Vector Y</h3>
          <div className="flex flex-col gap-4">
            {yVector.map((value, index) => (
              <div key={`y-${index}`} className="flex flex-col gap-1">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={value}
                  onChange={(e) => handleYSliderChange(index, e.target.value)}
                  className="w-full"
                />
                <input
                  type="number"
                  min="-10"
                  max="10"
                  value={value}
                  onChange={(e) => handleYInputChange(index, e.target.value)}
                  className="bg-white p-2 rounded text-center font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg w-full">
        <h3 className="text-lg font-semibold mb-2">Calculation:</h3>
        <div className="grid grid-cols-1 gap-2">
          {xVectors.map((xVector, vectorIndex) => (
            <p key={`formula-${vectorIndex}`} className="font-mono text-sm">
              X{vectorIndex + 1} · Y = {xVector[0]} × {yVector[0]} + {xVector[1]} × {yVector[1]} + {xVector[2]} × {yVector[2]} = {dotProducts[vectorIndex]}
            </p>
          ))}
          <p className="font-mono text-sm font-bold border-t border-yellow-200 pt-2 mt-1">
            Average = ({dotProducts.join(' + ')}) ÷ 3 = {averageDotProduct.toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Color coding: Blue (negative) → Green (zero) → Red (positive)</p>
      </div>
    </div>
  );
}