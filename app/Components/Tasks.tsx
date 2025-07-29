"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Popper,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Tasks = () => {
  const [taskList, setTaskList] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "task-popper" : undefined;

  const addTask = () => {
    if (taskInputRef.current && taskInputRef.current.value.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: taskInputRef.current.value,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      taskInputRef.current.value = "";
    }
  };
  const deleteTask = (taskId: number) => {
    const newList = taskList.filter((task) => task.id !== taskId);
    setTaskList(newList);
  };
  const completedTask = (taskId: number) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  };

  return (
    <Box className="flex flex-col items-center mt-4">
      <div className="flex gap-2">
        <TextField
          inputRef={taskInputRef}
          label="New Task"
          variant="outlined"
          size="medium"
          sx={{
            input: { color: "white" },
            label: { color: "gray" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#f5f5f5",
              },
            },
          }}
        />
        <button
          onClick={addTask}
          className="bg-transparent border-2 hover:bg-gray-300 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-white font-serif py-2 px-4 rounded-full"
        >
          Add
        </button>
        <IconButton
          aria-describedby={id}
          onClick={handleToggle}
          sx={{ color: "white", border: "1px solid white" }}
        >
          <TaskAltIcon />
        </IconButton>
      </div>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid #999",
            borderRadius: 2,
            color: "white",
            minWidth: 250,
            maxWidth: 400,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Tasks</Typography>
            <IconButton onClick={handleToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {taskList.length === 0 ? (
            <Typography variant="body2" color="gray" mt={1}>
              No tasks added yet.
            </Typography>
          ) : (
            <Box mt={1}>
              {taskList.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center px-3 py-1 rounded-lg bg-white/5 text-white"
                >
                  <span
                    className={`text-white ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    • {task.title}
                  </span>
                  <IconButton
                    onClick={() => completedTask(task.id)}
                    size="small"
                    sx={{ color: "white" }}
                  >
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      sx={{
                        color: task.completed ? "lightgreen" : "gray",
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    size="small"
                    sx={{
                      color: "#f87171",
                      padding: "4px",
                      "&:hover": {
                        color: "#ef4444",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
            </Box>
          )}
        </Paper>
      </Popper>
    </Box>
  );
};

export default Tasks;
