import React, { useState } from "react";
import { useVideosContext } from "../../context/VideosContext";
import playStyle from "./playlist.module.css";
import { v4 as uuidv4 } from "uuid";

export const Playlist = ({ video, id }) => {
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const {
    state: { playlist },
    dispatch,
  } = useVideosContext();

  console.log({ playlist });
  return (
    <div className={playStyle.list}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setValue(text);
          dispatch({
            type: "CREATE-NEW-PLAYLIST",
            payload: { id: uuidv4(), name: text, videos: [] },
          });
          setText("");
        }}
      >
        <label htmlFor="playlist">
          Enter Playlist Name : <br />
          <input
            type="text"
            name="playlist"
            id="playlist"
            className={playStyle.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" className={playStyle.submit} />
      </form>
      <h2>Avaliable playlist</h2>
      {playlist?.map((list) => (
        <div
          key={list.id}
          style={{
            padding: "0.25rem",
            backgroundColor: "#000",
            margin: "0.1rem",
          }}
        >
          <p>
            {" "}
            {list?.name} &nbsp;&nbsp;&nbsp;{" "}
            <button
              onClick={() => {
                dispatch({
                  type: "GET-LIST-BY-ID",
                  payload: { list, video, id },
                });
                console.log({ list });
              }}
              disabled={list.videos.find((vid) => vid.id === id) ? true : false}
            >
              Add
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
