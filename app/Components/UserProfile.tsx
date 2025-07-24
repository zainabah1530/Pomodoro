"use client";

import React, { useRef, useState } from "react";
import { auth, provider } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Typography,
  Popper,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signInWithPopup, signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const UserProfile = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef(null);

  const open = Boolean(anchorEl);
  const id = open ? "profile-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button aria-describedby={id} onClick={handleClick}>
        <Avatar
          src={user?.photoURL || ""}
          alt={user?.displayName || "User"}
          sx={{
            width: 64,
            height: 64,
            cursor: "pointer",
            border: "2px solid white",
          }}
        />
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        ref={popperRef}
        style={{ zIndex: 1300 }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "rgba(0, 0, 0, 0.75)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            color: "white",
            width: 280,
            border: "1px solid #444",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {user ? `Hello, ${user.displayName}` : "Welcome"}
          </Typography>

          <Divider sx={{ borderColor: "gray", mb: 1 }} />

          {/* Only show list if user is signed in */}
          {user && (
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ color: "white" }}>
                  <LeaderboardIcon />
                </ListItemIcon>
                <ListItemText primary="Stats (soon)" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "white" }}>
                  <PendingActionsIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks Remaining (soon)" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "white" }}>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks Completed (soon)" />
              </ListItem>

              <Divider sx={{ borderColor: "gray", my: 1 }} />
            </List>
          )}

          {/* Auth buttons */}
          {user ? (
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => signOut(auth)}
              startIcon={<LogoutIcon />}
              sx={{ textTransform: "none", fontSize: 14 }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => signInWithPopup(auth, provider)}
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none", fontSize: 14 }}
            >
              Sign in with Google
            </Button>
          )}
          <Button
            variant="text"
            fullWidth
            onClick={handleClose}
            sx={{ mt: 1, color: "white", textTransform: "none", fontSize: 14 }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {user ? "Close Profile" : "Close"}
            </Typography>
          </Button>
        </Box>
      </Popper>
    </>
  );
};

export default UserProfile;
