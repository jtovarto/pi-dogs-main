import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../redux/actions";
export const THEME_LIGHT = "theme-light";
export const THEME_DARK = "theme-dark";

export function useTheme() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(THEME_LIGHT);

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme === "") {
      storedTheme = theme;
      dispatch(changeTheme(theme));
    }

    if (storedTheme !== theme) {
      localStorage.setItem("theme", theme);
      dispatch(changeTheme(theme));
    }
  }, [theme, dispatch]);

  const toogleTheme = function () {
    if (localStorage.getItem("theme") === THEME_DARK) {
      setTheme(THEME_LIGHT);
    } else {
      setTheme(THEME_DARK);
    }
  };

  return { toogleTheme };
}
