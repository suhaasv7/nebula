
import { useState, useEffect, useLayoutEffect } from "react";
import { Box, Typography, Card, Button, Container, Paper } from "@mui/material";

// Need to check if this code actually works

// Side by Side Explanation Component
const EffectExplanation = ({ type }: { type: "effect" | "layout" }) => {
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

  const points =
    type === "effect"
      ? [
          "React updates the DOM and the browser paints",
          "useEffect runs asynchronously after paint",
          "Each color update creates a new render cycle",
        ]
      : [
          "React updates the DOM",
          "useLayoutEffect runs synchronously before paint",
          "Browser paints final state only",
        ];

  return (
    <Box
      sx={{ display: "flex", gap: 4, flexWrap: { xs: "wrap", md: "nowrap" } }}
    >
      {/* Left side: Points */}
      <Card
        sx={{
          flex: "1",
          minWidth: { xs: "100%", md: "300px" },
          p: 3,
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          How {type === "effect" ? "useEffect" : "useLayoutEffect"} Works
        </Typography>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            "& > li": {
              mb: 2,
              display: "flex",
              gap: 2,
            },
          }}
        >
          {points.map((point, index) => (
            <li key={index}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: type === "effect" ? "primary.main" : "success.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "0.875rem",
                }}
              >
                {index + 1}
              </Box>
              <Typography color="text.secondary">{point}</Typography>
            </li>
          ))}
        </Box>
      </Card>

      {/* Right side: Code */}
      <Card
        sx={{
          flex: "2",
          minWidth: { xs: "100%", md: "500px" },
          bgcolor: "#1a1a1a",
          overflow: "auto",
        }}
      >
        <pre
          style={{
            margin: 0,
            padding: 24,
            color: "#fff",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          <code>{code}</code>
        </pre>
      </Card>
    </Box>
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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          useEffect vs useLayoutEffect
        </Typography>
        <Typography variant="h6" color="text.secondary">
          A visual demonstration with TypeScript and code examples
        </Typography>
      </Box>

      {/* useEffect Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          useEffect Example
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          {effectColors.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 80,
                height: 80,
                bgcolor: color,
                borderRadius: 2,
                boxShadow: 1,
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setEffectTrigger((prev) => prev + 1)}
          sx={{ mb: 4 }}
        >
          Shuffle Colors
        </Button>

        <EffectExplanation type="effect" />
      </Paper>

      {/* useLayoutEffect Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          useLayoutEffect Example
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          {layoutEffectColors.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 80,
                height: 80,
                bgcolor: color,
                borderRadius: 2,
                boxShadow: 1,
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => setLayoutEffectTrigger((prev) => prev + 1)}
          sx={{ mb: 4 }}
        >
          Shuffle Colors
        </Button>

        <EffectExplanation type="layout" />
      </Paper>

      {/* Use Cases Section */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          When to Use Each Hook
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              useEffect is best for:
            </Typography>
            <ul style={{ color: "text.secondary", paddingLeft: 20 }}>
              <li>Data fetching and API calls</li>
              <li>Setting up subscriptions or timers</li>
              <li>Updating non-visual state</li>
              <li>Side effects that don't require synchronous execution</li>
            </ul>
          </Box>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              useLayoutEffect is best for:
            </Typography>
            <ul style={{ color: "text.secondary", paddingLeft: 20 }}>
              <li>DOM measurements and updates</li>
              <li>Tooltip positioning</li>
              <li>Animations that must be synchronized</li>
              <li>Preventing visual flickering</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UseEffectVsUseLayoutEffect;
