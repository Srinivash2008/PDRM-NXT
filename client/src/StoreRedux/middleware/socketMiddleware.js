import * as ActionTypes from '../constants/actionTypes';
import io from 'socket.io-client';

const socketMiddleware = (store) => {
    const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

    socket.on('connect', () => console.log('Connected to Socket.IO server'));

    socket.on('addSocket', (result) => {
        try {
            if (result?.success) {
                store.dispatch({ type: ActionTypes.ADD_DATA, payload: result });
            } else {
                console.error('user addition failed:', result);
            }
        } catch (error) {
            console.error('Error handling user:', error);
        }
    });
    socket.on('deleteSocket', (result) => {
        try {
            if (result?.success) {
                store.dispatch({ type: ActionTypes.DELETE_DATA, payload: result });
            } else {
                console.error('user addition failed:', result);
            }
        } catch (error) {
            console.error('Error handling user:', error);
        }
    });
    socket.on('updateSocket', (result) => {
        try {
            if (result?.success) {
                store.dispatch({ type: ActionTypes.UPDATE_DATA, payload: result });
            } else {
                console.error('user addition failed:', result);
            }
        } catch (error) {
            console.error('Error handling user:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    return (next) => (action) => {
        return next(action);
    };
};

export default socketMiddleware;