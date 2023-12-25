import ReactPlayer from "react-player";

const UserGrid = ({ muted, playing, participant }) => {
  return (
    <ReactPlayer
      muted={muted}
      playing={playing}
      url={participant.stream}
      width="401px"
      height="400px"
    />
  );
};

export default UserGrid;
