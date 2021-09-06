import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Heading,
  Pane,
  SelectField,
  TextInputField,
  toaster,
} from "evergreen-ui";
import { observer } from "mobx-react-lite";
import DefaultLayout from "../layout/default";
import { StoreContext } from "../context/store-context";
import { StreamType } from "../mobx/stores/studioStore";

type RTMPPaneProps = {
  roomId: string;
  rtmpLink: string;
};
const RTMPPane = (props: RTMPPaneProps) => {
  const handleCopy = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    await navigator.clipboard.writeText(e.currentTarget.value);
    toaster.success("Copied!");
  };

  return (
    <Pane>
      <TextInputField
        label={`URL`}
        defaultValue={props.rtmpLink}
        onClick={handleCopy}
      />

      <TextInputField
        label={`Stream key`}
        defaultValue={props.roomId}
        onClick={handleCopy}
      />
    </Pane>
  );
};

const WebRTCPane = () => {
  const [selectedAudio, setSelectedAudio] = useState<MediaStream | undefined>(
    undefined
  );

  const [selectedVideo, setSelectedVideo] = useState<MediaStream | undefined>(
    undefined
  );

  const availableAudio = useRef<MediaDeviceInfo[]>([]);
  const availableVideo = useRef<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      const currentAudio = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const currentVideo = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const availableDevices = await navigator.mediaDevices.enumerateDevices();

      const audioDevices: MediaDeviceInfo[] = [];
      const videoDevices: MediaDeviceInfo[] = [];

      availableDevices.forEach((device) => {
        if (device.kind === "audioinput") {
          audioDevices.push(device);
        }

        if (device.kind === "videoinput") {
          videoDevices.push(device);
        }
      });

      return { currentAudio, currentVideo, audioDevices, videoDevices };
    };

    getDevices().then(
      ({ currentAudio, currentVideo, audioDevices, videoDevices }) => {
        availableAudio.current = audioDevices;
        availableVideo.current = videoDevices;

        setSelectedAudio(currentAudio);
        setSelectedVideo(currentVideo);
      }
    );
  }, []);

  return (
    <>
      {selectedAudio && (
        <SelectField label={"Microphone"} value={selectedAudio?.id}>
          {availableAudio.current.map((audioDevice) => (
            <option value={audioDevice.deviceId}>{audioDevice.label}</option>
          ))}
        </SelectField>
      )}

      {selectedVideo && (
        <SelectField label={"Camera"} value={selectedVideo?.id}>
          {availableVideo.current.map((videoDevice) => (
            <option value={videoDevice.deviceId}>{videoDevice.label}</option>
          ))}
        </SelectField>
      )}
    </>
  );
};

const StudioPage = () => {
  const {
    auth: { user },
    studio,
  } = useContext(StoreContext);

  const handleCopy = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    await navigator.clipboard.writeText(e.currentTarget.value);

    toaster.success("Link copied!", {
      duration: 1,
    });
  };

  return (
    <DefaultLayout width={500}>
      <Pane
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading size={700}>Welcome, {user?.username}</Heading>
        <Avatar name={user?.username} hashValue={user?.username} size={48} />
      </Pane>

      <Pane marginTop={16}>
        <TextInputField
          label={`Invitation link`}
          hint={"Send this link to the person you want to see at the event"}
          defaultValue={studio.invitationLink}
          readOnly
          onClick={handleCopy}
        />
      </Pane>

      {studio.streamType === StreamType.RTMP ? (
        <RTMPPane
          roomId={studio.roomId || "undefined"}
          rtmpLink={studio.rtmpLink}
        />
      ) : (
        <WebRTCPane />
      )}
    </DefaultLayout>
  );
};

export default observer(StudioPage);
