import { useState, useEffect, useLayoutEffect } from "react";

// Side by Side Explanation Component
const EffectExplanation = ({ type }: { type: "effect" | "layout" }) => {
  const code =
    type === "effect"
      ? `// useEffect Example
useEffect(() => {
  let currentShuffle = 0;
  
  const shuffleColors = async () => {
    // Reset colors to initial state
    setEffectColors([...initialColors]);
    setEffectShuffleCount(0);
    
    // Run 5 shuffles with 1 second delay between each
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newColors = [...effectColors];
      // Shuffle the colors
      for (let j = 0; j < 5; j++) {
        const temp = newColors[j];
        const randomIndex = Math.floor(Math.random() * 5);
        newColors[j] = newColors[randomIndex];
        newColors[randomIndex] = temp;
      }
      
      // Update shuffle count and colors
      // These will cause DOM updates after each iteration
      setEffectShuffleCount(i + 1);
      setEffectColors([...newColors]);
    }
  };

  shuffleColors();
}, [effectTrigger]); // Runs after paint`
      : `// useLayoutEffect Example
useLayoutEffect(() => {
  let shuffleCount = 0;
  let currentColors = [...layoutEffectColors];
  
  const performAllShuffles = async () => {
    // Reset colors to initial state
    setLayoutEffectShuffleCount(0);
    
    // Run 5 shuffles internally, but DON'T update state yet
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track shuffle count internally
      shuffleCount = i + 1;
      
      // Shuffle the colors
      for (let j = 0; j < 5; j++) {
        const temp = currentColors[j];
        const randomIndex = Math.floor(Math.random() * 5);
        currentColors[j] = currentColors[randomIndex];
        currentColors[randomIndex] = temp;
      }
      
      // In real useLayoutEffect we wouldn't use any async logic,
      // this is just for demonstration purposes
    }
    
    // Only after all shuffles, update state ONCE
    // Browser will only paint the final result
    setLayoutEffectShuffleCount(5);
    setLayoutEffectColors([...currentColors]);
  };

  if (layoutEffectTrigger > 0) {
    performAllShuffles();
  }
}, [layoutEffectTrigger]); // Runs before paint`;

  const points =
    type === "effect"
      ? [
          "React updates the DOM and the browser paints after each shuffle",
          "useEffect runs asynchronously after paint",
          "You see each of the 5 shuffles happening in real time",
        ]
      : [
          "React updates the DOM only once at the end",
          "useLayoutEffect runs synchronously before paint",
          "You only see the final state after all 5 shuffles",
        ];

  return (
    <div
      className={`bg-${
        type === "effect" ? "blue" : "green"
      }-50 rounded-xl p-5 shadow-md h-fit flex flex-col mx-4 mb-4`}
    >
      <div className="mb-5">
        <h3
          className={`text-xl font-bold text-${
            type === "effect" ? "blue" : "green"
          }-700 mb-3`}
        >
          How {type === "effect" ? "useEffect" : "useLayoutEffect"} Works
        </h3>
        <ul className="mb-4 space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <div
                className={`flex-shrink-0 h-6 w-6 rounded-full bg-${
                  type === "effect" ? "blue" : "green"
                }-500 flex items-center justify-center mt-1 mr-3`}
              >
                <span className="text-sm text-white">{index + 1}</span>
              </div>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow overflow-auto bg-gray-900 rounded-lg">
        <pre className="p-4 m-0 text-sm leading-relaxed text-white">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const UseEffectVsUseLayoutEffect = () => {
  // Constants
  const initialColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];

  // State(s)
  const [effectColors, setEffectColors] = useState<string[]>([
    ...initialColors,
  ]);
  const [layoutEffectColors, setLayoutEffectColors] = useState<string[]>([
    ...initialColors,
  ]);
  const [effectTrigger, setEffectTrigger] = useState<number>(0);
  const [layoutEffectTrigger, setLayoutEffectTrigger] = useState<number>(0);
  const [effectShuffleCount, setEffectShuffleCount] = useState<number>(0);
  const [layoutEffectShuffleCount, setLayoutEffectShuffleCount] =
    useState<number>(0);
  const [layoutInternalCounter, setLayoutInternalCounter] = useState<number>(0);

  useEffect(() => {
    if (effectTrigger === 0) return;

    let active = true;

    const shuffleColors = async () => {
      setEffectColors([...initialColors]);
      setEffectShuffleCount(0);

      for (let i = 0; i < 5; i++) {
        if (!active) return;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!active) return;

        const newColors = [...effectColors];
        for (let j = 0; j < 5; j++) {
          const temp = newColors[j];
          const randomIndex = Math.floor(Math.random() * 5);
          newColors[j] = newColors[randomIndex];
          newColors[randomIndex] = temp;
        }

        setEffectShuffleCount(i + 1);
        setEffectColors([...newColors]);
      }
    };

    shuffleColors();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectTrigger]);

  useLayoutEffect(() => {
    if (layoutEffectTrigger === 0) return;

    let active = true;

    const performAllShuffles = async () => {
      setLayoutEffectColors([...initialColors]);
      setLayoutEffectShuffleCount(0);
      setLayoutInternalCounter(0);

      const currentColors = [...initialColors];

      for (let i = 0; i < 5; i++) {
        if (!active) return;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!active) return;

        setLayoutInternalCounter(i + 1);

        for (let j = 0; j < 5; j++) {
          const temp = currentColors[j];
          const randomIndex = Math.floor(Math.random() * 5);
          currentColors[j] = currentColors[randomIndex];
          currentColors[randomIndex] = temp;
        }
      }

      if (!active) return;

      setLayoutEffectShuffleCount(5);
      setLayoutEffectColors(currentColors);
      setLayoutInternalCounter(0);
    };

    performAllShuffles();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutEffectTrigger]);

  const resetExamples = () => {
    setEffectColors([...initialColors]);
    setLayoutEffectColors([...initialColors]);
    setEffectShuffleCount(0);
    setLayoutEffectShuffleCount(0);
    setLayoutInternalCounter(0);
  };

  return (
    <div className="mx-auto bg-white max-w-7xl">
      <div className="py-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          useEffect vs useLayoutEffect
        </h1>
        <p className="text-gray-600">
          A visual demonstration with TypeScript and code examples
        </p>
      </div>

      {/* Main content in grid layout */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* useEffect Column */}
        <div className="overflow-hidden bg-white shadow-md rounded-xl">
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-blue-700">
              useEffect Example
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {effectColors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-16 h-16 font-bold text-white rounded-lg shadow"
                  style={{
                    backgroundColor: color,
                    textShadow: "0px 0px 3px rgba(0,0,0,0.7)",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="flex justify-center mb-4">
              <div className="text-xl font-bold">
                Shuffle: {effectShuffleCount}/5
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  effectShuffleCount > 0 && effectShuffleCount < 5
                    ? "bg-blue-300 text-blue-800 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => setEffectTrigger((prev) => prev + 1)}
                disabled={effectShuffleCount > 0 && effectShuffleCount < 5}
              >
                {effectShuffleCount > 0 && effectShuffleCount < 5
                  ? `Shuffling... (${effectShuffleCount}/5)`
                  : "Start Shuffling"}
              </button>
            </div>
          </div>

          <EffectExplanation type="effect" />
        </div>

        {/* useLayoutEffect Column */}
        <div className="overflow-hidden bg-white shadow-md rounded-xl">
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-green-700">
              useLayoutEffect Example
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {layoutEffectColors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-16 h-16 font-bold text-white rounded-lg shadow"
                  style={{
                    backgroundColor: color,
                    textShadow: "0px 0px 3px rgba(0,0,0,0.7)",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-xl font-bold">
                Shuffle: {layoutEffectShuffleCount}/5
              </div>

              {/* Internal progress indicator */}
              {layoutInternalCounter > 0 && layoutEffectShuffleCount === 0 && (
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-2 bg-yellow-500 rounded-full animate-pulse">
                    <span className="text-xs font-bold text-white">
                      {layoutInternalCounter}
                    </span>
                  </div>
                  <span className="text-sm italic text-gray-600">
                    (Internal shuffle in progress - DOM not updated yet)
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  (layoutEffectShuffleCount > 0 &&
                    layoutEffectShuffleCount < 5) ||
                  layoutInternalCounter > 0
                    ? "bg-green-300 text-green-800 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                onClick={() => setLayoutEffectTrigger((prev) => prev + 1)}
                disabled={
                  (layoutEffectShuffleCount > 0 &&
                    layoutEffectShuffleCount < 5) ||
                  layoutInternalCounter > 0
                }
              >
                {layoutInternalCounter > 0
                  ? `Shuffling... (Internal: ${layoutInternalCounter}/5)`
                  : "Start Shuffling"}
              </button>
            </div>
          </div>

          <EffectExplanation type="layout" />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mb-8">
        <button
          className="px-6 py-2 font-medium text-purple-600 border-2 border-purple-500 rounded-md hover:bg-purple-50"
          onClick={resetExamples}
        >
          Reset Both Examples
        </button>
      </div>

      {/* Use Cases Section - Using the newer design */}
      <div className="mb-8">
        <HookComparison />
      </div>
    </div>
  );
};

export default UseEffectVsUseLayoutEffect;

const HookComparison = () => {
  return (
    <div className="max-w-5xl p-8 mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">
        When to Use Each Hook
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {/* useEffect Column */}
        <div className="p-6 border-l-4 border-blue-500 shadow-md bg-blue-50 rounded-xl">
          <h3 className="mb-6 text-2xl font-bold text-blue-700">
            useEffect is best for:
          </h3>

          <ul className="space-y-4">
            {[
              "Data fetching and API calls",
              "Setting up subscriptions or timers",
              "Updating non-visual state",
              "Side effects that don't require synchronous execution",
              "Most side effects in your application",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 bg-blue-500 rounded-full">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 mt-6 bg-blue-100 rounded-lg">
            <p className="italic text-blue-800">
              Runs <strong>after</strong> browser paint, allowing the UI to
              update without blocking.
            </p>
          </div>
        </div>

        {/* useLayoutEffect Column */}
        <div className="p-6 border-l-4 border-green-500 shadow-md bg-green-50 rounded-xl">
          <h3 className="mb-6 text-2xl font-bold text-green-700">
            useLayoutEffect is best for:
          </h3>

          <ul className="space-y-4">
            {[
              "DOM measurements and updates",
              "Tooltip positioning",
              "Animations that must be synchronized",
              "Preventing visual flickering",
              "When you need to measure and then update the DOM before paint",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 bg-green-500 rounded-full">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 mt-6 bg-green-100 rounded-lg">
            <p className="italic text-green-800">
              Runs <strong>before</strong> browser paint, ensuring all DOM
              mutations are synchronized.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-10 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Key Differences
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-lg text-gray-600">
              <span className="font-bold text-blue-600">useEffect</span> is
              asynchronous and non-blocking, making it better for most use
              cases.
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-600">
              <span className="font-bold text-green-600">useLayoutEffect</span>{" "}
              is synchronous and can block rendering, but prevents flickering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
