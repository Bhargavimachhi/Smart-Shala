import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const History = ({ uploadedFiles }) => {
  const navigate = useNavigate();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [open, setOpen] = useState(false);
  const [urls, setUrls] = useState([]);
  const [homeworks, setHomeworks] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const fetchedUrls = await Promise.all(
        uploadedFiles.map(async (homeworkId) => {
          const fileRef = ref(
            storage,
            `/homeworks/${homeworkId}/${savedAuth.id}`
          );
          const url = await getDownloadURL(fileRef);
          return { homeworkId, url, fileName: homeworkId.split("/").pop() }; // Extracting fileName from homeworkId
        })
      );
      setUrls(fetchedUrls);
    };
    const fetchHomeworks = async () => {
      let list = [];
      await Promise.all(
        uploadedFiles.map(async (homeworkId) => {
          const res = await axios.get(
            `http://localhost:3000/homework/${homeworkId}`
          );
          list.push(res.data.homework);
        })
      );
      setHomeworks(list);
    };

    fetchUrls();
    fetchHomeworks();
  }, [uploadedFiles]);

  const redirect = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        className="!bg-btn !text-white hover:!bg-sky-400"
      >
        History
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          className="p-4"
        >
          <div>
            <p className="text-2xl font-semibold text-start text-text">
              History
            </p>
            <hr className="my-2 border-b border-btn" />
          </div>
          <List>
            {urls.map(({ homeworkId, url, fileName }, index) => (
              <ListItem
                key={index} // You can use index or homeworkId if it's unique
                onClick={() => redirect(url)}
                disablePadding
                className="mb-2 border rounded-lg"
              >
                <ListItemButton>
                  <ListItemText primary={homeworks[index]?.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default History;
