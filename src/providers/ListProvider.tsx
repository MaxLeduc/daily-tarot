import { createContext, FC, ReactNode, useState, useReducer } from 'react'

import type {List} from '@app/types'
import { useMemo } from 'react'

type ListContextShape = {
  lists: List[],
  setLists?: (lists: List[]) => void,
}

const initialValues = {
  lists: [],
  isLoading: false,
}

export const ListContext = createContext<ListContextShape>(initialValues)

interface ListsReducerState {
  lists: List[],
  isLoading: boolean
}

type SetLists = {
  type: 'SET_LISTS',
  payload: List[]
}

const reducer = (state: ListsReducerState, action: SetLists) => {
  switch(action.type) {
    case 'SET_LISTS':
      return {...state, lists: action.payload}
    default:
      return state
  }
}

type ListContextProps = {
  children: ReactNode
}

const ListProvider: FC<ListContextProps> = ({ children }) => {
  const [{isLoading, lists}, setState] = useReducer(reducer, initialValues)

  const value: ListContextShape = useMemo(() => ({
    lists,
    setLists: (lists: List[]) => setState({type: 'SET_LISTS', payload: lists}),
  }), [lists, isLoading])

  return (
    <ListContext.Provider value={value}>{children}</ListContext.Provider>
  )
}

export default ListProvider
