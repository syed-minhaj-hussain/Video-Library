import React from "react";
import { useVideosContext } from "../../context/VideosContext";

export const History = () => {
  const {
    state: { history },
  } = useVideosContext();
  // const rev = history.reverse();
  console.log({ history });
  return <div></div>;
};
