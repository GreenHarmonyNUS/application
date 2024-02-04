import { Box, createTheme } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { margin, padding } from "@mui/system";
import React from "react";

export interface ProgressionInterface {
  image_path: string;
  eventTagName: string;
  value: number;
}

export const progressionDummyAgri: ProgressionInterface = {
  image_path: "assets/farm.png",
  eventTagName: "#farming",
  value: 90,
};

export const progressionDummyHandicraft: ProgressionInterface = {
  image_path: "assets/handicraft.png",
  eventTagName: "#handicraft",
  value: 26,
};

export const progressionDummySustainability: ProgressionInterface = {
  image_path: "assets/sustainable.png",
  eventTagName: "#sustainability",
  value: 10,
};

const ProgressionBlock: React.FC<ProgressionInterface> = (props) => {
  const image_path = props.image_path;
  const eventTagName = props.eventTagName;
  const value = props.value; // out of 100

  const progressBarStyles = {
    height: 10,
    borderRadius: 20,
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#4CAF50", // Green color for the active progress bar
    },
    "& .MuiLinearProgress-root": {
      backgroundColor: "rgba(255, 255, 255, 0.5)", // Color of the track (background)
    },
    width: "70vw",
  };

  return (
    <div className="flex items-center">
      {/* Icon on the left */}
      <div className="mr-4 flex flex-col pb-5 pt-5">
        {/* Replace 'your-icon.png' with the actual path to your icon */}
        <img src={image_path} alt="Progression" className="h-12 w-12" />
      </div>

      {/* Linear progress bar on the right */}
      <Box sx={{ marginTop: "10px", marginLeft: "8px" }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={progressBarStyles}
        />
        <p>{eventTagName}</p>
      </Box>
    </div>
  );
};

export default ProgressionBlock;
