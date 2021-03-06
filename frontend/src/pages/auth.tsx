import DefaultLayout from "../layout/default";
import { Button, Pane, TextInputField } from "evergreen-ui";
import { ChangeEvent, useContext, useRef } from "react";
import { RootStore } from "../mobx/store";
import { StoreContext } from "../context/store-context";
import { LoginDto } from "../models/auth/login.dto";

const AuthPage = () => {
  const store = useContext<RootStore>(StoreContext);
  const username = useRef("");

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    username.current = event.currentTarget.value;
  };

  const handleSubmit = async () => {
    const user: LoginDto = {
      username: username.current,
      password: "somePass",
    };

    store.auth.signIn(user);
  };

  return (
    <DefaultLayout width={400}>
      <TextInputField
        label={"Username"}
        tabIndex={0}
        required={true}
        placeholder={"Username"}
        onChange={handleUsername}
      />

      <Pane display={"flex"} flexDirection={"column"}>
        <Button
          type={"submit"}
          tabIndex={1}
          appearance={"primary"}
          size={"large"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Pane>
    </DefaultLayout>
  );
};

export default AuthPage;
