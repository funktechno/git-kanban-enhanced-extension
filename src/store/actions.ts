import * as types from "./mutation-types";

export const setFoo = ({ commit }: any, payload: any) => {
  commit(types.UPDATE_FOO, payload);
};
