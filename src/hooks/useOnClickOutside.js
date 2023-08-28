import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          event.target.id === "notOutside" ||
          event.target?.className === "loader"
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
};

export default useOnClickOutside;
