import * as types from "./mutation-types";

export default {
  [types.UPDATE_FOO](state: any, payload: any) {
    state.foo = payload;
  }
};
