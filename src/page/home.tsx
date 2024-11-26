import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Box,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const topics = [
  {
    title: "useEffect vs useLayoutEffect",
    description:
      "Visual demonstration of React hooks: See the difference between useEffect and useLayoutEffect in action with practical examples.",
    path: "/hooks-comparison",
    tags: ["Hooks", "React", "Animation"],
    icon: "🔄",
    difficulty: "Intermediate",
    iconBg: "#e1f5fe",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #f6f8fc 30%, #ffffff 90%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={10}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              background: "linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            React Concepts & Demonstrations
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", opacity: 0.8 }}
          >
            Interactive examples and visual demonstrations to master React
            concepts
          </Typography>
        </Box>

        {/* Cards Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mb: 8,
          }}
        >
          {topics.map((topic, index) => (
            <Card
              key={index}
              sx={{
                flex: "1 1 350px",
                maxWidth: "400px",
                borderRadius: 3,
                background: "#ffffff",
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.08)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                  borderColor: "primary.main",
                  "& .explore-button": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Icon and Title */}
                <Box mb={3}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: topic.iconBg,
                      fontSize: "1.5rem",
                      mb: 2,
                    }}
                  >
                    {topic.icon}
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {topic.title}
                  </Typography>
                </Box>

                {/* Tags */}
                <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                  {topic.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: alpha("#1976d2", 0.1),
                        color: "primary.main",
                        fontWeight: 500,
                        "&:hover": { backgroundColor: alpha("#1976d2", 0.2) },
                      }}
                    />
                  ))}
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, minHeight: "60px" }}
                >
                  {topic.description}
                </Typography>

                {/* Footer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    Difficulty: {topic.difficulty}
                  </Typography>
                  <Button
                    className="explore-button"
                    onClick={() => navigate(topic.path)}
                    endIcon={<ArrowRightAltIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor: "transparent",
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    Explore
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
