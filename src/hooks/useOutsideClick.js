import { useEffect, useRef } from "react";

function useOutsideClick(handler, litenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = function (e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document?.addEventListener("click", handleClick, litenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, litenCapturing);
  }, [handler, litenCapturing]);

  return { ref };
}

export default useOutsideClick;
