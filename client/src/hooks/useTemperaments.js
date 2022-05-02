import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from "../redux/actions";

export function useTemperaments() {
  const storeTempers = useSelector((state) => state.allTempers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTemperaments());    
  }, [dispatch]);

  const loadTempers = () => {
    dispatch(getAllTemperaments());
  };

  return [storeTempers, loadTempers];
}