"use client";

import { Button, TextField, Typography, Box, InputAdornment } from "@mui/material";
import { Mail } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requestPasswordReset(email: string) {
  const response = await fetch("/auth/forgotpassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Reset request failed");
  return data;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await requestPasswordReset(email);
      setMessage("Reset link sent! Check your email.");
      setError("");
      setTimeout(() => router.push("/login"), 3000); // Redirect after 3s
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : "Something went wrong. Try again."));
      setMessage("");
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
        src="/trading-bg.jpg" // Same as login/signup
        alt="Trading Background"
        fill
        priority
        style={{ objectFit: "cover", opacity: 0.6 }}
      />

      {/* Overlay */}
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

      {/* Centered Forgot Password Form */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: "90%", sm: "400px" },
          bgcolor: "rgba(0, 0, 0, 0.85)", // Semi-transparent black
          borderRadius: 2,
          p: 4,
          boxShadow: "0 8px 32px rgba(0, 255, 0, 0.2)", // Green shadow
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
            Reset Your Password
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMessage("");
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
            helperText={!emailRegex.test(email) && email.length > 0 ? "Invalid email" : ""}
            error={!emailRegex.test(email) && email.length > 0}
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
          {message && (
            <Typography
              variant="body2"
              sx={{ mt: 1, textAlign: "center", color: "#00FF00", fontFamily: "Roboto, sans-serif" }}
            >
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!emailRegex.test(email)}
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
              "&.Mui-disabled": {
                bgcolor: "#666633", // Dimmed green when disabled
                color: "#FFFFFF",
              },
            }}
          >
            Send Reset Link
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
            Back to{" "}
            <a
              href="/login"
              style={{ color: "#00FF00", textDecoration: "none", fontWeight: 600 }}
            >
              Log In
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}