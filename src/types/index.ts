export interface IUser {
  id: string;
  name: string;
  stream: MediaStream;
  playing: boolean;
  muted: boolean;
}

export interface IFooterProps {
  controls: {
    muted: boolean;
    toggleAudio: () => void;
    playing: boolean;
    toggleVideo: () => void;
  };
}

export interface IUserContextType {
  authenticated: boolean;
  setAuthenticated: (d: boolean) => void;
}
