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
  Avatar,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [longSize, setLongSize] = useState("0.00");
  const [shortSize, setShortSize] = useState("0.00");
  const [isLongActive, setIsLongActive] = useState(false);
  const [isShortActive, setIsShortActive] = useState(false);
  const [viewMode, setViewMode] = useState<"pricing" | "funding">("pricing"); // Track pricing or funding
  const [isLoading, setIsLoading] = useState(true); // New state for controlled loading

  const userInitial = session?.user?.email?.charAt(0).toUpperCase() || "";

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
          p: { xs: 1, md: 2 }, // Smaller padding on mobile
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
            width={80} // Smaller on mobile
            height={32} // Smaller on mobile
            decoding="async"
            className="mb-xx-small"
            src="/logo.svg"
            style={{ color: "transparent" }}
            onClick={() => router.push("/")}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
          <Typography
            variant="body2" // Smaller text on mobile
            sx={{
              fontFamily: "Roboto, sans-serif",
              color: "#FFFFFF",
              display: { xs: "none", sm: "block" },
            }}
          >
            {session.user?.email}
          </Typography>
          <Avatar
            sx={{
              bgcolor: "#00FF00",
              color: "#000000",
              width: { xs: 30, md: 40 }, // Smaller on mobile
              height: { xs: 30, md: 40 },
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(0, 255, 0, 0.4)",
            }}
          >
            {userInitial}
          </Avatar>
          <Tooltip title="Sign Out">
            <IconButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              sx={{
                color: "#00FF00",
                "&:hover": { bgcolor: "rgba(0, 255, 0, 0.1)" },
                p: { xs: 0.5, md: 1 }, // Smaller padding on mobile
              }}
            >
              <ExitToApp sx={{ fontSize: { xs: 20, md: 24 } }} /> {/* Smaller icon on mobile */}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 2, md: 3 }, // Smaller padding on mobile
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, side-by-side on desktop
          gap: { xs: 2, md: 3 }, // Smaller gap on mobile
          justifyContent: "center",
          alignItems: "flex-start",
          mt: { xs: 1, md: 2 }, // Smaller margin on mobile
        }}
      >
        {/* Market Data (Left) */}
        <Box
          sx={{
            bgcolor: "rgba(20, 20, 20, 0.9)",
            borderRadius: { xs: 1, md: 2 }, // Smaller radius on mobile
            p: { xs: 2, md: 3 }, // Smaller padding on mobile
            width: "100%", // Full width on mobile, 50% on desktop (handled by flex)
            border: "1px solid rgba(0, 255, 0, 0.2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 5 }, ml: { xs: 1, md: 2 } }}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", mb: { xs: 1, md: 2 } }}>
                <Image
                  alt="market icon"
                  loading="lazy"
                  width={40} // Smaller on mobile
                  height={40}
                  decoding="async"
                  data-nimg="1"
                  src="/market.svg"
                  style={{ color: "transparent" }}
                />
                <Typography
                  variant="h5" // Smaller heading on mobile if needed, but keeping h4 for consistency
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    mt: { xs: 1, md: 2 },
                    fontSize: { xs: "1.25rem", md: "1.5rem" }, // Smaller on mobile
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
                  mb: { xs: 1, md: 1 },
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.125rem" }, // Slightly smaller on mobile
                }}
              >
                $151.60
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 3 } }}>
                <Typography
                  variant="body1" // Larger font
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#FF4444",
                  }}
                >
                  -$15.12 (-9.06%)
                </Typography>
                <Typography sx={{ color: "#FFFFFF", fontSize: { xs: "14px", md: "18px" } }}>
                  Past week
                </Typography>
              </Box>
            </Box>

            {/* Market Stats */}
            <Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 2 } }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    Market Price
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    $152.15 <span style={{ color: "#00FF00" }}>+0.365%</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    24h Volume
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    $1.8M--
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    Open Interest
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    $1.03M <span style={{ color: "#00FF00" }}>+53.05%</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    Funding/Velocity
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    -1.0953% / 0.1316%
                  </Typography>
                </Box>
              </Box>

              {/* OI Availability */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 2 } }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    OI Avail. Long
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    $313.64K
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                  >
                    OI Avail. Short
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: "dashed",
                      borderColor: "rgba(0, 255, 0, 0.3)",
                      my: { xs: 0.25, md: 0.5 },
                      width: { xs: "60px", md: "80px" }, // Smaller on mobile
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } }}
                  >
                    $546.83K
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Pricing/Funding Toggle */}
          <Box sx={{ display: "flex", gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 2 } }}>
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
                fontSize: { xs: "12px", md: "14px" }, // Smaller on mobile
                px: { xs: 1, md: 2 }, // Smaller padding on mobile
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
                fontSize: { xs: "12px", md: "14px" }, // Smaller on mobile
                px: { xs: 1, md: 2 }, // Smaller padding on mobile
              }}
              onClick={() => setViewMode("funding")}
            >
              Funding
            </Button>
          </Box>

          {/* Dynamic Content Based on View Mode */}
          <Box sx={{ mb: { xs: 2, md: 2 } }}>
            {viewMode === "pricing" ? (
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 2 }, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                    >
                      Index Price $151.60
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                    >
                      Market Price $152.132
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                    >
                      FPU $2.18
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                    >
                      Volume $10.09K
                    </Typography>
                  }
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 2 }, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
                    >
                      Rate: -1.0953%
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "#00FF00", "&.Mui-checked": { color: "#00FF00" } }} />}
                  label={
                    <Typography
                      sx={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF", opacity: 0.7, fontSize: { xs: "8px", md: "10px" } }}
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
            borderRadius: { xs: 1, md: 2 }, // Smaller radius on mobile
            p: { xs: 2, md: 3 }, // Smaller padding on mobile
            width: "100%", // Full width on mobile, 30% on desktop (handled by flex)
            border: "1px solid rgba(0, 255, 0, 0.2)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            mt: { xs: 2, md: 0 }, // Add margin top on mobile to stack below
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 1, md: 2 } }}>
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
                borderRadius: { xs: 0.5, md: 1 }, // Smaller radius on mobile
                flex: 1,
                mr: { xs: 0.5, md: 1 }, // Smaller margin on mobile
                fontSize: { xs: "12px", md: "14px" }, // Smaller text on mobile
                px: { xs: 1, md: 2 }, // Smaller padding on mobile
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
                borderRadius: { xs: 0.5, md: 1 }, // Smaller radius on mobile
                flex: 1,
                ml: { xs: 0.5, md: 1 }, // Smaller margin on mobile
                fontSize: { xs: "12px", md: "14px" }, // Smaller text on mobile
                px: { xs: 1, md: 2 }, // Smaller padding on mobile
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
          <Box sx={{ mt: { xs: 1, md: 2 } }}>
            <TextField
              fullWidth
              label="Max"
              variant="outlined"
              value="$0.00"
              sx={{
                mb: { xs: 1, md: 2 },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } },
                "& .Mui-focused.MuiInputLabel-root": { color: "#00FF00" },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                mb: { xs: 1, md: 2 },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } },
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
                mb: { xs: 1, md: 2 },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  "& fieldset": { borderColor: "#00FF00" },
                  "&:hover fieldset": { borderColor: "#00CC00" },
                  "&.Mui-focused fieldset": { borderColor: "#00FF00" },
                },
                "& .MuiInputLabel-root": { color: "#FFFFFF", fontSize: { xs: "12px", md: "14px" } },
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
                borderRadius: { xs: 0.5, md: 1 }, // Smaller radius on mobile
                mt: { xs: 1, md: 1 },
                fontSize: { xs: "12px", md: "14px" }, // Smaller text on mobile
                px: { xs: 1, md: 2 }, // Smaller padding on mobile
              }}
            >
              Connect Wallet
            </Button>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Roboto, sans-serif",
                color: "#FFFFFF",
                mt: { xs: 1, md: 1 },
                textAlign: "center",
                opacity: 0.7,
                fontSize: { xs: "8px", md: "10px" }, // Smaller on mobile
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