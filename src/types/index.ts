export interface User {
  id: string;
  name: string;
  stream: MediaStream;
  playing: boolean;
  muted: boolean;
}

export interface FooterProps {
  controls: {
    micOn: boolean;
    setMicOn: (e: boolean) => void;
    cameraOn: boolean;
    setCameraOn: (e: boolean) => void;
    socket: any;
    peerId: string | undefined;
  };
}

export interface UserContextType {
  authenticated: boolean
  setAuthenticated: (d: boolean) => void
}
