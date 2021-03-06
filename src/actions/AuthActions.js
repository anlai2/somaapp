import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_START
	 } from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const createUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_START });
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => createUserSuccess(dispatch, user))
					.catch(() => createUserFail(dispatch));
					
	};
};

const createUserFail = (dispatch) => {
	dispatch({ type: CREATE_USER_FAIL })
}

const createUserSuccess = (dispatch, user) => {
	dispatch({
		type: CREATE_USER_SUCCESS,
		payload: user
	});

	Actions.loginuser();
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_START });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
	};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	Actions.stAuth();
};


