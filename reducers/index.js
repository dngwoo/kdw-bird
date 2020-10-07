import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = (state,action) => {
  switch (action.type){
    
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;

    default: {
      const combinedReducer = combineReducers({
        user, post
      });
      return combinedReducer(state,action);
    }
  }

};

export default rootReducer;


// 간단한게 만드는 방법
// const rootReducer = combineReducers({
//   user,
//   post
// })

// 복잡하게 만드는 방법
// const rootReducer = (state, action) => {
//   switch (action.type){
//     default: {
//       const combinedReducer = combineReducers({
//         user,
//         post
//       })
//     }
//     return combinedReducer
//   }
// }