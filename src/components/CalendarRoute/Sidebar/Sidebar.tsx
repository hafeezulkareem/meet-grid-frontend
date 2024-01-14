import { Box, Button, svgIconClasses } from "@mui/material";
import React, { FC } from "react";
import {
  DateCalendar,
  LocalizationProvider,
  dateCalendarClasses,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import AddIcon from "./AddIcon/AddIcon";
import { pickersArrowSwitcherClasses } from "@mui/x-date-pickers/internals";

interface Props {
  showSidebar: boolean;
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
}

const Sidebar: FC<Props> = (props) => {
  const { showSidebar, selectedDate, setSelectedDate } = props;

  return (
    <Box
      sx={{
        width: "256px",
        marginLeft: showSidebar ? "0px" : "-256px",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s",
        padding: "16px",
      }}
    >
      <Button
        startIcon={<AddIcon />}
        color="inherit"
        sx={{
          height: "50px",
          backgroundColor: "#fff",
          boxShadow:
            "0px 1px 2px 0px rgba(60,64,67,0.3),0px 1px 3px 1px rgba(60,64,67,0.15)",
          padding: "0px 24px",
          color: "rgb(60,64,67)",
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: "#f6fafe",
            boxShadow:
              "0px 4px 4px 0px rgba(60,64,67,0.3),0px 8px 12px 6px rgba(60,64,67,0.15)",
          },
          textTransform: "none",
        }}
      >
        Create an event
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={setSelectedDate}
          views={["day"]}
          showDaysOutsideCurrentMonth
          sx={{
            [`&.${dateCalendarClasses.root}`]: {
              width: "auto",
              height: "auto",
            },
            "& .MuiDayCalendar-weekDayLabel": {
              width: "24px",
              height: "24px",
              fontSize: "10px",
              fontWeight: 500,
            },
            "& .MuiDayCalendar-slideTransition": {
              minHeight: "140px",
            },
          }}
          slotProps={{
            calendarHeader: {
              sx: {
                [`&.${pickersCalendarHeaderClasses.root}`]: {
                  color: "rgb(60,64,67)",
                },
                [`& .${pickersCalendarHeaderClasses.label}`]: {
                  fontSize: "14px",
                  letterSpacing: ".25px",
                  lineHeight: "20px",
                },
                [`& .${pickersArrowSwitcherClasses.button}`]: {
                  width: "24px",
                  height: "24px",
                  padding: "0px",
                },
                [`& .${pickersArrowSwitcherClasses.button} .${svgIconClasses.root}`]:
                  {
                    width: "18px",
                    height: "18px",
                  },
                [`& .${pickersArrowSwitcherClasses.spacer}`]: {
                  width: "28px",
                },
              },
            },
            day: {
              sx: {
                [`&.${pickersDayClasses.root}`]: {
                  width: "24px",
                  height: "24px",
                  fontSize: "10px",
                  fontWeight: 500,
                  ":hover": {
                    backgroundColor: "rgb(241,243,244)",
                  },
                },
                [`&.${pickersDayClasses.selected}`]: {
                  backgroundColor: "rgb(210,227,252)",
                  color: "rgb(24,90,188)",
                  "&:hover": {
                    backgroundColor: "rgb(174,203,250)",
                  },
                  ":focus": {
                    backgroundColor: "rgb(210,227,252)",
                  },
                },
                [`&.${pickersDayClasses.today}`]: {
                  border: "none",
                  color: "#fff",
                  backgroundColor: "rgb(26,115,232)",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Sidebar;
