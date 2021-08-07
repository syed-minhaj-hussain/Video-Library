import { createContext, useReducer, useContext, useEffect } from "react";
import { products } from "../productsDB";
import { reducerFunc } from "../utilities";

const VideosContext = createContext();

export const WishCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    liked: [],
    history: [],
    playlist: [],
    watchLater: [],
  });

  //   useEffect(() => {
  //     dispatch({
  //       type: "CART-UPDATED",
  //       payload: JSON.parse(localStorage.getItem("myCart")) || [],
  //     });
  //   }, []);

  //   useEffect(() => {
  //     dispatch({
  //       type: "WISHLIST-UPDATED",
  //       payload: JSON.parse(localStorage.getItem("myWishlist")) || [],
  //     });
  //   }, []);

  //   useEffect(() => {
  //     if (state.cart) {
  //       localStorage.setItem("myCart", JSON.stringify(state.cart));
  //     }
  //   }, [state.cart]);
  //   useEffect(() => {
  //     if (state.wishlist) {
  //       localStorage.setItem("myWishlist", JSON.stringify(state.wishlist));
  //     }
  //   }, [state.wishlist]);

  return (
    <VideosContext.Provider value={{ state, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideosContext = () => useContext(VideosContext);
