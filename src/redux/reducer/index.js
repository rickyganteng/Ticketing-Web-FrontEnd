import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import movie from "./movie";
import updateProfile from "./user";
import premiere from "./premiere"

export default combineReducers({
  counter,
  auth,
  movie,
  updateProfile,
  premiere
});