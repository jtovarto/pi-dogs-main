import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../redux/actions";
export const THEME_LIGHT = "theme-light";
export const THEME_DARK = "theme-dark";

export function useTheme() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    let currentTheme = "";
    if (storedTheme === "") {
      localStorage.setItem("theme", THEME_LIGHT);
      currentTheme = THEME_LIGHT;
    } else if (!theme) {
      currentTheme = storedTheme;
    } else {
      localStorage.setItem("theme", theme);
      currentTheme = theme;
    }
    dispatch(changeTheme(currentTheme));
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
