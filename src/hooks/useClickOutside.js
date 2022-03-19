import React, { useEffect } from "react";

//takes ref to an element and calls callback if click was performed outside that element
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref]);
};

export default useClickOutside;
