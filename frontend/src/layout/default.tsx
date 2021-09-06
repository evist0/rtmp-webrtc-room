import React from "react";
import styled from "styled-components";
import { Pane } from "evergreen-ui";

type DefaultLayoutProps = {
  width?: number | string;
  children: React.ReactNode;
};

const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const DefaultLayout = (props: DefaultLayoutProps) => {
  return (
    <LayoutWrapper>
      <Pane
        width={props.width || "600px"}
        background={"#fff"}
        elevation={2}
        padding={30}
      >
        {props.children}
      </Pane>
    </LayoutWrapper>
  );
};

export default DefaultLayout;
