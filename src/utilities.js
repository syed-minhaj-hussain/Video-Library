export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "HISTORY":
      return { ...state, history: [action.payload, ...state.history] };

    case "CHANGE-HISTORY":
      return {
        ...state,
        history: [
          action.payload,
          ...state.history.filter((vid) => vid.id !== action.payload.id),
        ],
      };

    case "REMOVE-FROM-HISTORY":
      return {
        ...state,
        history: state.history.filter((vid) => vid.id !== action.payload),
      };

    case "CREATE-NEW-PLAYLIST":
      return { ...state, playlist: [action.payload, ...state.playlist] };

    case "LIKE":
      return { ...state, liked: [...state.liked, action.payload] };

    case "WATCH-LATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };

    case "REMOVE-FROM-LIKED":
      return {
        ...state,
        liked: state?.liked?.filter((vid) => vid.id !== action.payload),
      };

    case "REMOVE-FROM-WATCH-LATER":
      return {
        ...state,
        watchLater: state?.watchLater?.filter(
          (vid) => vid.id !== action.payload
        ),
      };
    case "GET-LIST-BY-ID":
      return {
        ...state,
        playlist: state.playlist.map((pList) =>
          pList.id === action.payload.list.id
            ? {
                ...action.payload.list,
                videos: action.playload?.list?.videos.find(
                  (vid) => vid.id === action.payload.video.id
                )
                  ? [...action.payload.list.videos]
                  : [...action.payload.list.videos, action.payload.video],
              }
            : pList
        ),
      };
    case "PLAYLIST-UPDATED":
      return { ...state, playlist: action.payload };

    case "LIKED-UPDATED":
      return { ...state, liked: action.payload };

    case "WATCH-LATER-UPDATED":
      return { ...state, watchLater: action.payload };

    case "HISTORY-UPDATED":
      return { ...state, history: action.payload };

    default:
      return state;
  }
};
