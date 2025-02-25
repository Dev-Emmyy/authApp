"use client";

import { useSession, signOut } from "next-auth/react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Divider,
  CircularProgress,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [longSize, setLongSize] = useState("0");
  const [shortSize, setShortSize] = useState("0");
  const [isLongActive, setIsLongActive] = useState(false);
  const [isShortActive, setIsShortActive] = useState(false);
  const [viewMode, setViewMode] = useState<"pricing" | "funding">("pricing"); // Track pricing or funding
  const [isLoading, setIsLoading] = useState(true); // New state for controlled loading

  useEffect(() => {
    // Simulate a loading delay (e.g., 3 seconds)
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    // Cleanup timeout on unmount or re-render
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures it runs once on mount

  if (isLoading || status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#000000",
          color: "#FFFFFF",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress
          sx={{
            color: "#00FF00",
            width: "40px",
            height: "40px",
          }}
        />
        <Typography variant="h6" sx={{ fontFamily: "Roboto, sans-serif" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#000000",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          bgcolor: "rgba(0, 0, 0, 0.9)",
          borderBottom: "1px solid rgba(0, 255, 0, 0.3)",
          boxShadow: "0 4px 16px rgba(0, 255, 0, 0.2)",
        }}
      >
        {/* Parcl Logo/Name on Left */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            alt="Parcl Logo"
            priority
            width={100}
            height={40}
            decoding="async"
            className="mb-xx-small"
            src="/logo.svg"
            style={{ color: "transparent" }}
            onClick={() => router.push("/")}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto, sans-serif",
              color: "#FFFFFF",
              display: { xs: "none", sm: "block" },
            }}
          >
            {session.user?.email}
          </Typography>
          <Tooltip title="Sign Out">
            <IconButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              sx={{
                color: "#00FF00",
                "&:hover": { bgcolor: "rgba(0, 255, 0, 0.1)" },
              }}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, side-by-side on desktop
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          mt: 2,
        }}
      >
        {/* Market Data (Left) */}
        <Box
          sx={{
            bgcolor: "rgba(20, 20, 20, 0.9)",
            borderRadius: 2,
            p: 3,
            width: { xs: "100%", md: "50%" },
            border: "1px solid rgba(0, 255, 0, 0.2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 5, ml: 2 }}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                <Image
                  alt="market icon"
                  loading="lazy"
                  width="50"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  src="/market.svg"
                  style={{ color: "transparent" }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    mt: 2,
                  }}
                >
                  Pittsburgh
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#00FF00",
                  mb: 1,
                  fontWeight: 700,
                }}
              >
                $151.60
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3}}>
              <Typography
                variant="body1" // Larger font
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#FF4444",
                }}
              >
                -$15.12 (-9.06%) 
              </Typography>
              <Typography sx={{color: "#FFFFFF", fontSize: "18px"}}>
                Past week
              </Typography>
              </Box>

            </Box>

            {/* Market Stats */}
            <Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    Market Price
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    $152.15 <span style={{ color: "#00FF00" }}>+0.365%</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    24h Volume
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    $1.8M--
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    Open Interest
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    $1.03M <span style={{ color: "#00FF00" }}>+53.05%</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    Funding/Velocity
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    -1.0953% / 0.1316%
                  </Typography>
                </Box>
              </Box>

              {/* OI Availability */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    OI Avail. Long
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    $313.64K
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                  >
                    OI Avail. Short
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: 0.5,
                      width: "80px", 
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}
                  >
                    $546.83K
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Pricing/Funding Toggle */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant={viewMode === "pricing" ? "contained" : "outlined"}
              sx={{
                borderColor: "#00FF00",
                color: viewMode === "pricing" ? "#000000" : "#00FF00",
                bgcolor: viewMode === "pricing" ? "#00FF00" : "transparent",
                "&:hover": {
                  borderColor: "#00CC00",
                  bgcolor: viewMode === "pricing" ? "#00CC00" : "rgba(0, 255, 0, 0.1)",
                },
                fontFamily: "Roboto, sans-serif",
              }}
              onClick={() => setViewMode("pricing")}
            >
              Pricing
            </Button>
            <Button
              variant={viewMode === "funding" ? "contained" : "outlined"}
              sx={{
                borderColor: "#00FF00",
                color: viewMode === "funding" ? "#000000" : "#00FF00",
                bgcolor: viewMode === "funding" ? "#00FF00" : "transparent",
                "&:hover": {
                  borderColor: "#00CC00",
                  bgcolor: viewMode === "funding" ? "#00CC00" : "rgba(0, 255, 0, 0.1)",
                },
                fontFamily: "Roboto, sans-serif",
              }}
              onClick={() => setViewMode("funding")}
            >
              Funding
            </Button>
          </Box>

          {/* Dynamic Content Based on View Mode */}
          <Box sx={{ mb: 2 }}>
            {viewMode === "pricing" ? (
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      Index Price $151.60
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      Market Price $152.132
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      FPU $2.18
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      Volume $10.09K
                    </Typography>
                  }
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      Rate: -1.0953%
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: "10px" }}
                    >
                      Velocity: 0.1316%
                    </Typography>
                  }
                />
              </Box>
            )}
          </Box>
        </Box>

       {/* Trading Box (Right) - Long/Short */}
        <Box
          sx={{
            bgcolor: "rgba(20, 20, 20, 0.9)",
            borderRadius: 2,
            p: 3,
            width: { xs: "100%", md: "30%" }, // Narrower on desktop
            border: "1px solid rgba(0, 255, 0, 0.2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: isLongActive ? "#00FF00" : "rgba(0, 255, 0, 0.2)", // Green background when active
                color: isLongActive ? "#000000" : "#00FF00",
                "&:hover": {
                  bgcolor: isLongActive ? "#00CC00" : "rgba(0, 255, 0, 0.3)",
                  boxShadow: "0 4px 16px rgba(0, 255, 0, 0.4)",
                },
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                borderRadius: 1,
                flex: 1,
                mr: 1,
              }}
              onClick={() => {
                setIsLongActive(true);
                setIsShortActive(false);
              }}
            >
              Long
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: isShortActive ? "#FF4444" : "rgba(255, 68, 68, 0.2)", // Red background when active
                color: isShortActive ? "#FFFFFF" : "#FF4444",
                "&:hover": {
                  bgcolor: isShortActive ? "#CC3333" : "rgba(255, 68, 68, 0.3)",
                  boxShadow: "0 4px 16px rgba(255, 68, 68, 0.4)",
                },
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                borderRadius: 1,
                flex: 1,
                ml: 1,
              }}
              onClick={() => {
                setIsShortActive(true);
                setIsLongActive(false);
              }}
            >
              Short
            </Button>
          </Box>

          {/* Trading Inputs (Always Visible) */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Max"
              variant="outlined"
              value="$0.00"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF" },
                "& .Mui-focused.MuiInputLabel-root": { color: "#00FF00" },
              }}
            />
            <TextField
              fullWidth
              label="Size"
              variant="outlined"
              value={isLongActive ? longSize : shortSize}
              onChange={(e) =>
                isLongActive ? setLongSize(e.target.value) : setShortSize(e.target.value)
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF" },
                "& .Mui-focused.MuiInputLabel-root": { color: "#00FF00" },
              }}
            />
            <TextField
              fullWidth
              label="Est. Fill Price"
              variant="outlined"
              value="--"
              disabled
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF" },
                "& .Mui-focused.MuiInputLabel-root": { color: "#00FF00" },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#1976D2", // Blue for Connect Wallet
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#1565C0", boxShadow: "0 4px 16px rgba(25, 118, 210, 0.4)" },
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                borderRadius: 1,
                mt: 1,
              }}
            >
              Connect Wallet
            </Button>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Roboto, sans-serif",
                color: "#FFFFFF",
                mt: 1,
                textAlign: "center",
                opacity: 0.7,
                fontSize: "10px",
              }}
            >
              Slippage 2.00%
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}