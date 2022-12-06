import { combineReducers } from "redux";
import auth from "./auth/reducer";
import media from "./media/reducer";
import user from "./user/reducer";
import role from "./role/reducer";
import shared from "./shared/reducer";
const reducers = combineReducers({
  auth,
  media,
  user,
  role,
  shared,
});

export default reducers;
