import { createStore } from "vuex"
import VuexPersistence from 'vuex-persist'
import { getOrderForClient } from "../backend_utilities/orders"

export const store = createStore({
    state () {
      return {
        isAuth: false,
        currentUser:null,
        orders:null,
        loading:false,
      }
    },
    getters: {
      getOrders(state) { return state.orders }, 
      isLoading(state) { return state.loading }
    },
    plugins: [new VuexPersistence().plugin],
    actions:{
      async getOrdersC({state, commit} ,payload){
        const order = await getOrderForClient(payload)
       console.log(order);
       if (order) {
            state.orders = order
              commit("setOrder",order)
       }
      }
    },

    mutations: {
      setAuth (state,payload) {
        state.isAuth = payload.isAuth
        state.currentUser = payload.currentUser
      },
      activateUser(state){
        state.currentUser.d = false
        state.currentUser.active = true
      },
       setOrder(state,order){
       
          state.orders=order
       },
 
      disconnect(state){
       

          state.isAuth = false
          state.currentUser = null
         state.orders = null
       
      }
    }
  })