import {TOURNAMENT_REGISTER_SUCCESS} from "../Actions/constants";

export default (state = {
  registrationSuccess: false
}, action) => {
  switch (action.type) {
    case TOURNAMENT_REGISTER_SUCCESS:
      return {
        ...state,
        registrationSuccess: true
      };
    default:
      return state;
  }
}
