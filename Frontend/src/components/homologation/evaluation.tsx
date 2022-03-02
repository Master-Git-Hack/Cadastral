import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { selectHomologation } from "../../features/homologations/homologationsSlice";
export function Evaluation() {
  const { items } = useAppSelector(selectHomologation);
  const dispatch = useAppDispatch();
}
