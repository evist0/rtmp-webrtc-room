import { ChangeEvent, useContext, useRef } from "react";
import { Link as MobxLink } from "mobx-router";
import { Button, Heading, Pane, Text, TextInputField } from "evergreen-ui";
import { RootStore } from "../../mobx/store";
import { StoreContext } from "../../context/store-context";
import DefaultLayout from "../../layout/default";
import authRoutes from "./routes";

const SignInPage = () => {
  const store = useContext<RootStore>(StoreContext);

  const username = useRef("");
  const password = useRef("");

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    username.current = event.currentTarget.value;
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    password.current = event.currentTarget.value;
  };

  const handleSubmit = async () => {
    const user = {
      username: username.current,
      password: password.current,
    };

    await store.auth.signIn(user);
  };

  return (
    <DefaultLayout width={400}>
      <Heading is={"h1"} size={800} marginBottom={8}>
        Sign in
      </Heading>

      <TextInputField
        label={"Username"}
        tabIndex={0}
        required={true}
        placeholder={"Username"}
        onChange={handleUsername}
      />

      <TextInputField
        label={"Password"}
        type={"password"}
        tabIndex={1}
        required={true}
        placeholder={"*********"}
        onChange={handlePassword}
      />

      <Pane display={"flex"} flexDirection={"column"}>
        <Button
          type={"submit"}
          tabIndex={2}
          appearance={"primary"}
          size={"large"}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Pane textAlign={"center"}>
          <MobxLink route={authRoutes.signUp} router={store.router}>
            <Text>I'm already registered</Text>
          </MobxLink>
        </Pane>
      </Pane>
    </DefaultLayout>
  );
};

export default SignInPage;
