"use client";
import { useSession, signOut } from "next-auth/react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Safely derive userInitial without useEffect
  const userInitial = session?.user?.email?.charAt(0).toUpperCase() || "";

  // Consistent loading state
  if (status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#000000",
          color: "#FFFFFF",
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: "Roboto, sans-serif" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
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
          <Image alt="Parcl Logo" priority width={100} height={40} decoding="async" className="mb-xx-small" src="/logo.svg" style={{ color: "transparent" }} />
        </Box>

        {/* Username and Avatar on Right */}
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
          <Avatar
            sx={{
              bgcolor: "#00FF00",
              color: "#000000",
              width: 40,
              height: 40,
              fontSize: "1.25rem",
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
              }}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box>
        {/* Main Content */}
        <Box>
          <Box>
            <Box>
              <Image alt="market icon" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" src="/market.svg" style={{ color: "transparent" }}/>
            </Box>
          </Box>











        </Box>
        
      </Box>
      
    </Box>
  );
}