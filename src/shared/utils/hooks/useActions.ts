import { exerciseActions, userActions } from "@/app/StoreProvider/slices";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const rootActions = {
  ...userActions,
  ...exerciseActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
