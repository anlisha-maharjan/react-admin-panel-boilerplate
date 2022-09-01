import { combineReducers } from "redux";
import auth from "./auth/reducer";
import media from "./media/reducer";
import user from "./user/reducer";
const reducers = combineReducers({
  auth,
  media,
  user,
});

export default reducers;
