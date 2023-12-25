import React, { FC } from "react";
import ReactPlayer from "react-player";

interface Props {
  playing: boolean;
  muted: boolean;
  stream: MediaStream;
}

const UserDisplay: FC<Props> = (props) => {
  const { playing, muted, stream } = props;

  return (
    <ReactPlayer
      url={stream}
      muted={muted}
      playing={playing}
      width="401px"
      height="400px"
    />
  );
};

export default UserDisplay;
