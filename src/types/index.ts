export interface User {
  id: string;
  name: string;
  stream: MediaStream;
  playing: boolean;
  muted: boolean;
}
