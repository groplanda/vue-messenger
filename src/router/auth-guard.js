import store from "../store";

const guard = (to, from, next) => {
  if(store.getters.getUserAuth) {
    next();
  } else {

    next( '/login?error=true' )
  }
}
export default guard;