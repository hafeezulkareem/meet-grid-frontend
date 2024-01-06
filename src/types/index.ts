export interface IUser {
  id: string;
  name: string;
  stream: MediaStream;
  playing: boolean;
  muted: boolean;
}

export interface IFooterProps {
  controls: {
    micOn: boolean;
    setMicOn: (e: boolean) => void;
    cameraOn: boolean;
    setCameraOn: (e: boolean) => void;
    socket: any;
    peerId: string | undefined;
  };
}

export interface IUserContextType {
  authenticated: boolean;
  setAuthenticated: (d: boolean) => void;
}
