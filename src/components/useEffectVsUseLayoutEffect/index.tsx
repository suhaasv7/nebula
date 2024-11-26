/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from "react";

interface CodeExplanationProps {
  type: "effect" | "layout";
}

const CodeExplanation: React.FC<CodeExplanationProps> = ({ type }) => {
  const code =
    type === "effect"
      ? `// useEffect Example
useEffect(() => {
  const shuffleColors = async () => {
    const newColors = [...colors];
    
    // Colors update one by one
    for (let i = 0; i < 5; i++) {
      const temp = newColors[i];
      const randomIndex = Math.floor(Math.random() * 5);
      newColors[i] = newColors[randomIndex];
      newColors[randomIndex] = temp;
      
      // Each setColors triggers a new render
      setColors([...newColors]);
      
      // Wait before next update
      await new Promise(resolve => 
        setTimeout(resolve, 100)
      );
    }
  };

  shuffleColors();
}, [trigger]); // Runs after paint`
      : `// useLayoutEffect Example
useLayoutEffect(() => {
  const newColors = [...colors];
  
  // All colors update at once
  for (let i = 0; i < 5; i++) {
    const temp = newColors[i];
    const randomIndex = Math.floor(Math.random() * 5);
    newColors[i] = newColors[randomIndex];
    newColors[randomIndex] = temp;
  }
  
  // Single update with final state
  setColors(newColors);
}, [trigger]); // Runs before paint`;

  return (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm leading-6 mt-4">
      <code>{code}</code>
    </pre>
  );
};

const UseEffectVsUseLayoutEffect = () => {
  const [effectColors, setEffectColors] = useState<string[]>([
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
  ]);
  const [layoutEffectColors, setLayoutEffectColors] = useState<string[]>([
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
  ]);
  const [effectTrigger, setEffectTrigger] = useState<number>(0);
  const [layoutEffectTrigger, setLayoutEffectTrigger] = useState<number>(0);

  useEffect(() => {
    const shuffleColors = async () => {
      const newColors = [...effectColors];
      for (let i = 0; i < 5; i++) {
        const temp = newColors[i];
        const randomIndex = Math.floor(Math.random() * 5);
        newColors[i] = newColors[randomIndex];
        newColors[randomIndex] = temp;
        setEffectColors([...newColors]);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    if (effectTrigger > 0) {
      shuffleColors();
    }
  }, [effectTrigger]);

  useLayoutEffect(() => {
    if (layoutEffectTrigger > 0) {
      const newColors = [...layoutEffectColors];
      for (let i = 0; i < 5; i++) {
        const temp = newColors[i];
        const randomIndex = Math.floor(Math.random() * 5);
        newColors[i] = newColors[randomIndex];
        newColors[randomIndex] = temp;
      }
      setLayoutEffectColors(newColors);
    }
  }, [layoutEffectTrigger]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            useEffect vs useLayoutEffect
          </h1>
          <p className="text-lg text-gray-600">
            A visual demonstration with TypeScript and code examples
          </p>
        </header>

        {/* useEffect Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            useEffect Example
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {effectColors.map((color, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-xl shadow-md transition-colors duration-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button
            onClick={() => setEffectTrigger((prev) => prev + 1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Shuffle Colors
          </button>

          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How useEffect Works
            </h3>
            <div className="space-y-3 text-gray-600 mb-6">
              <p>1. React updates the DOM and the browser paints</p>
              <p>2. useEffect runs asynchronously after paint</p>
              <p>3. Each color update creates a new render cycle</p>
            </div>

            <CodeExplanation type="effect" />

            <div className="mt-6">
              <p className="font-semibold text-gray-900 mb-2">Key Points:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Asynchronous execution after browser paint</li>
                <li>You can see intermediate states</li>
                <li>
                  Better for non-visual updates (API calls, subscriptions)
                </li>
                <li>Multiple render cycles visible to user</li>
              </ul>
            </div>
          </div>
        </section>

        {/* useLayoutEffect Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            useLayoutEffect Example
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {layoutEffectColors.map((color, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-xl shadow-md transition-colors duration-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button
            onClick={() => setLayoutEffectTrigger((prev) => prev + 1)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Shuffle Colors
          </button>

          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How useLayoutEffect Works
            </h3>
            <div className="space-y-3 text-gray-600 mb-6">
              <p>1. React updates the DOM</p>
              <p>2. useLayoutEffect runs synchronously before paint</p>
              <p>3. Browser paints final state only</p>
            </div>

            <CodeExplanation type="layout" />

            <div className="mt-6">
              <p className="font-semibold text-gray-900 mb-2">Key Points:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Synchronous execution before browser paint</li>
                <li>Only final state is visible</li>
                <li>Better for visual updates (measurements, animations)</li>
                <li>Single render cycle visible to user</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            When to Use Each Hook
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                useEffect is best for:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Data fetching and API calls</li>
                <li>Setting up subscriptions or timers</li>
                <li>Updating non-visual state</li>
                <li>Side effects that don't require synchronous execution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                useLayoutEffect is best for:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>DOM measurements and updates</li>
                <li>Tooltip positioning</li>
                <li>Animations that must be synchronized</li>
                <li>Preventing visual flickering</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UseEffectVsUseLayoutEffect;
