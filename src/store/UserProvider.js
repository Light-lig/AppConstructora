import * as React from 'react'

const UserContext = React.createContext(null);

var inicialState = {};
function userReducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER":

        return action.item;
    default:
    
        return state;
  }
}

function UserProvider({children}) {
  const [state, dispatch] = React.useReducer(userReducer, inicialState)

  const value = {state, dispatch}
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('userConext must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUser}
