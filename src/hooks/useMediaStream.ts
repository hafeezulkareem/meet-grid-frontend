import { useState, useEffect, useRef } from "react";

export const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamSet = useRef(false);

  useEffect(() => {
    if (streamSet.current) return;

    streamSet.current = true;

    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        console.log("setting your stream");

        setStream(stream);
      } catch (e) {
        console.log("Error in media navigator", e);
      }
    })();
  }, []);

  return stream;
};
