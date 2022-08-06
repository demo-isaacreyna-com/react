import * as React from "react";
import { useState } from 'react';
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#0a1021",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#0a1021",
  color: "white",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex", //done
  alignItems: "center", //done
  justifyContent: "flex-end", //done
  padding: theme.spacing(0, 1), //done
  // necessary for content to be below app bar //done
  ...theme.mixins.toolbar, //done
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const drawerMenu = [
  {
    title: "General",
    listItems: [
      {
        title: "Blueprints",
        id: 1,
        icon: <InboxIcon color="primary" />,
        listItems: [
          { title: "One" },
          { title: "Two" },
          { title: "Three" },
          { title: "Four" },
          { title: "Five" },
        ],
      },
      {
        title: "Dashboards",
        id: 2,
        icon: <MailIcon color="primary" />,
      },
      {
        title: "Data Display",
        id: 3,
        icon: <InboxIcon color="primary" />,
        listItems: [
          { title: "One" },
          { title: "Two" },
          { title: "Three" },
          { title: "Four" },
          { title: "Five" },
        ],
      },
    ],
  },
  {
    title: "Management",
    listItems: [
      {
        title: "Users",
        id: 4,
        icon: <InboxIcon color="primary" />,
        listItems: [
          { title: "One" },
          { title: "Two" },
          { title: "Three" },
          { title: "Four" },
          { title: "Five" },
        ],
      },
      {
        title: "Projects",
        id: 5,
        icon: <MailIcon color="primary" />,
        listItems: [
          { title: "One" },
          { title: "Two" },
          { title: "Three" },
          { title: "Four" },
          { title: "Five" },
        ],
      },
      {
        title: "Invoices",
        id: 6,
        icon: <InboxIcon color="primary" />,
        listItems: [
          { title: "One" },
          { title: "Two" },
          { title: "Three" },
          { title: "Four" },
          { title: "Five" },
        ],
      },
    ],
  },
];

export default function SideBar({ isOpen }) {
    const [settings, setSettings] = useState([
        { id: 1, open: false },
        { id: 2, open: false },
        { id: 3, open: false },
        { id: 4, open: false },
        { id: 5, open: false },
        { id: 6, open: false },
    ]);

  const handleClick = (id) => {
    setSettings(settings.map(item => item.id === id ? { ...item, open: !item.open } : item));
  };

  return (
    <Drawer variant="permanent" open={isOpen} sx={{ zIndex: 0 }}>
      <Toolbar />
      <DrawerHeader>
        <IconButton color="inherit">
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {drawerMenu.map((header) => (
        <List
          color="inherit"
          key={header.title}
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{
                background: "none",
                color: "white",
                display: isOpen ? "block" : "none",
              }}
            >
              {header.title}
            </ListSubheader>
          }
        >
          {header.listItems.map((menu) => (
            <ListItem
              color="primary"
              key={menu.title}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                onClick={() => {
                  handleClick(menu.id);
                }}
                color="primary"
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  color="primary"
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.title}
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
                {isOpen && menu.listItems?.length > 0 && (settings.find(item => item.id === menu.id).open ? <ExpandLess /> : <ExpandMore />) }
              </ListItemButton>
              <Collapse
                style={{ display: isOpen ? "block" : "none" }}
                in={settings.find(item => item.id === menu.id).open}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menu.listItems?.map((submenu) => (
                    <ListItemButton
                      sx={{ pl: 9 }}
                      key={`${menu.title}-${menu.title}-${submenu.title}`}
                    >
                      <ListItemText primary={submenu.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
      ))}
    </Drawer>
  );
}