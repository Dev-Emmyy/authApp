"use client";

import { signIn } from "next-auth/react";
import { Button, TextField, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError(res?.error || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Image
        src="/trading-bg.jpg" // Replace with your image path
        alt="Trading Background"
        fill
        priority
        style={{ objectFit: "cover", opacity: 0.6 }}
      />

      {/* Overlay to darken the background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
          zIndex: 1,
        }}
      />

      {/* Centered Login Form */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: "90%", sm: "400px" },
          bgcolor: "rgba(0, 0, 0, 0.85)", // Semi-transparent black
          borderRadius: 2,
          p: 4,
          boxShadow: "0 8px 32px rgba(0, 255, 0, 0.2)", // Green-tinted shadow
          border: "1px solid rgba(0, 255, 0, 0.3)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              color: "#00FF00", // Green
              letterSpacing: "-0.5px",
            }}
          >
            Parcl
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto, sans-serif",
              color: "#FFFFFF",
              mt: 1,
            }}
          >
            Your Trading Dashboard
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail sx={{ color: "#FFFFFF" }} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
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
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#FFFFFF" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#FFFFFF" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#00FF00" },
                "&:hover fieldset": { borderColor: "#00CC00" },
                "&.Mui-focused fieldset": { borderColor: "#00FF00" },
              },
              "& .MuiInputLabel-root": { color: "#FFFFFF" },
              "& .Mui-focused.MuiInputLabel-root": { color: "#00FF00" },
            }}
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 1, textAlign: "center", fontFamily: "Roboto, sans-serif" }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "8px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              bgcolor: "#00FF00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#00CC00",
                boxShadow: "0 4px 16px rgba(0, 255, 0, 0.4)",
              },
            }}
          >
            Log In
          </Button>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
              mt: 2,
              color: "#FFFFFF",
            }}
          >
            Forgot Password?{" "}
            <a
              href="/forgotpassword"
              style={{ color: "#00FF00", textDecoration: "none", fontWeight: 600 }}
            >
              Reset Here
            </a>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
              mt: 1,
              color: "#FFFFFF",
            }}
          >
            New to Parcl?{" "}
            <a
              href="/signup"
              style={{ color: "#00FF00", textDecoration: "none", fontWeight: 600 }}
            >
              Sign Up
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}