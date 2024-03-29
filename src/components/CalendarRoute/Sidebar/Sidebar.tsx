import {
  Box,
  Button,
  Input,
  Typography,
  inputClasses,
  svgIconClasses,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

interface Props {
  showSidebar: boolean;
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
}

const Sidebar: FC<Props> = (props) => {
  const { showSidebar, selectedDate, setSelectedDate } = props;

  const [searchText, setSearchText] = useState<string>("");

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

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
      <Box
        sx={{
          width: "auto",
          height: "40px",
          position: "relative",
          backgroundColor: "rgb(241,243,244)",
          margin: "0px 20px 8px 20px",
          borderRadius: "4px 4px 0px 0px",
          padding: "0px 12px",
        }}
      >
        {searchText.length === 0 && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: "0px",
              left: "0px",
              color: "#80868a",
              padding: "inherit",
            }}
          >
            <PeopleAltOutlinedIcon fontSize="medium" />
            <Typography sx={{ marginLeft: "12px", fontSize: "14px" }}>
              Search for people
            </Typography>
          </Box>
        )}
        <Input
          onChange={handleSearchTextChange}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0px",
            left: "0px",
            backgroundColor: "transparent",
            fontSize: "14px",
            padding: "inherit",
            color: "#80868a",
            [`:hover:not(.${inputClasses.disabled} .${inputClasses.error})::before`]:
              {
                borderBottom: "transparent",
              },
            "::before": {
              borderBottomColor: "transparent",
            },
          }}
          slotProps={{
            input: { sx: { padding: "0px", caretColor: "#1976d2" } },
          }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
