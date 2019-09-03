import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD':
      // refeito para usar o metodo do inner
      // return [
      //   ...state,
      //   {
      //     ...action.product,
      //     anmout: 1,
      //   },
      // ];

      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if (productIndex >= 0) {
          draft[productIndex].anmout += 1;
        } else {
          draft.push({
            ...action.product,
            anmout: 1,
          });
        }
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_ANMOUT': {
      if (action.anmout <= 0) {
        return state;
      }
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].anmout = Number(action.anmout);
        }
      });
    }
    default:
      return state;
  }
}
