// reducer.js
import * as ActionTypes from '../constants/actionTypes';
const initialState = {
    pages: {
        dashboard: {
            loading: {
                clientCards: false,
                ProductionCards: false,
            },
            data: {
                clientCardsData: [],
                ProductionCardsData: [],
            },
            filters: {
                clientCardsFilter: [],
                ProductionCardsFilter: [],
            },
        }
    },
    error: null,
    message: null,
    AddSuccess: false, // this is for redirect specific action based
    UpdateSuccess: false, // this is for redirect specific action based 
    DeleteSuccess: false, // this is for redirect specific action based
};

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.page]: {
                        ...state.pages[action.page],
                        loading: {
                            ...state.pages[action.page].loading,
                            [action.component]: action.payload,
                        },
                    },
                },
                // AddSuccess: false,
                // UpdateSuccess: false,
                // DeleteSuccess: false,
            };

        case ActionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ...state.pages[action.payload.page],
                        loading: {
                            ...state.pages[action.payload.page].loading,
                            [action.payload.loading]: false,
                        },
                        data: {
                            ...state.pages[action.payload.page].data,
                            [action.payload.component]: action.payload.data.result,
                        },
                    },
                },
                AddSuccess: false,
                UpdateSuccess: false,
                DeleteSuccess: false,
            };


        case ActionTypes.ADD_DATA:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ...state.pages[action.payload.page],
                        loading: {
                            ...state.pages[action.payload.page].loading,
                            [action.payload.loading]: false,
                        },
                        data: {
                            ...state.pages[action.payload.page].data,
                            [action.payload.component]: [
                                action.payload.data,
                                ...state.pages[action.payload.page].data[action.payload.component],

                            ],
                        },
                    },
                },
                AddSuccess: true,
            };

        case ActionTypes.UPDATE_DATA:
            console.log(action.payload)
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ...state.pages[action.payload.page],
                        loading: {
                            ...state.pages[action.payload.page].loading,
                            [action.payload.loading]: false,
                        },
                        data: {
                            ...state.pages[action.payload.page].data,
                            [action.payload.component]: state.pages[action.payload.page].data[action.payload.component].map(item =>
                                item[action.payload.idName] == action.payload.id ? { ...item, ...action.payload.updatedData } : item
                            ),
                        },
                    },
                },
                UpdateSuccess: true,
            };

        case ActionTypes.DELETE_DATA:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ...state.pages[action.payload.page],
                        loading: {
                            ...state.pages[action.payload.page].loading,
                            [action.payload.loading]: false,
                        },
                        data: {
                            ...state.pages[action.payload.page].data,
                            [action.payload.component]: state.pages[action.payload.page].data[action.payload.component].filter(item => {
                                return (item[action.payload.idName] !== action.payload.id)
                            }),
                        },
                    },
                },
                DeleteSuccess: true,
            };
        case ActionTypes.ERROR_ACTION:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ...state.pages[action.payload.page],
                        loading: {
                            ...state.pages[action.payload.page].loading,
                            [action.payload.loading]: false,
                        },
                    },
                },
            };

        default:

            const token = sessionStorage.getItem('token');
            const user = sessionStorage.getItem('user');
            if (token == null && user == null) {
                return state;
            }


            return state;
    }
};

export default CommonReducer;