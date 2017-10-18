import api from "../api";
import {userLoggedIn} from "./auth";

export const signup = data => dispatch =>
api.user.signup(data).then(user => {
    localStorage.JWTtoken = user.JWTtoken;
    dispatch(userLoggedIn(user));
});   