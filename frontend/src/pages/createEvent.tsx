import React, { ChangeEvent, useContext, useState } from "react";
import {
  Avatar,
  Button,
  FormField,
  Group,
  Heading,
  Pane,
  TextInputField,
} from "evergreen-ui";
import { observer } from "mobx-react-lite";
import DefaultLayout from "../layout/default";
import { StoreContext } from "../context/store-context";
import { StreamType } from "../mobx/stores/studioStore";
import routes from "../config/routes";

const eventType = [
  { label: "WebRTC", value: StreamType.WebRTC },
  { label: "RTMP", value: StreamType.RTMP },
];

const CreateEventPage = () => {
  const {
    router,
    auth: { user },
    studio,
  } = useContext(StoreContext);

  const [title, setTitle] = useState<string>("");
  const [streamType, setStreamType] = useState<StreamType>(StreamType.WebRTC);

  const handleSubmit = async () => {
    await studio.createEvent({ title, streamType });

    router.goTo(routes.studio).then();
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
          label={`Event title`}
          description={"Please, input event title"}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />

        <FormField
          label={"Stream type"}
          description={"Please, select stream type for this event"}
        >
          <Group display={"flex"} justifyContent={"center"}>
            {eventType.map((option) => (
              <Button
                key={option.value}
                appearance={streamType === option.value ? "primary" : undefined}
                onClick={() => setStreamType(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Group>
        </FormField>
      </Pane>

      <Pane
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        marginTop={32}
      >
        <Button appearance={"primary"} onClick={handleSubmit}>
          Submit
        </Button>
      </Pane>
    </DefaultLayout>
  );
};

export default observer(CreateEventPage);
