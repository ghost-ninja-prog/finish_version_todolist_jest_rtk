import { useDispatch, useSelector } from "react-redux";
import { TypeAppDispatch, TypeRootState } from "./store";


export const useAppDispatch = useDispatch.withTypes<TypeAppDispatch>()
export const useAppSelector = useSelector.withTypes<TypeRootState>()