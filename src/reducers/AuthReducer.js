import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_START
	 } from '../actions/types';

const INITIAL_STATE = { 
	email: '', 
	password: '', 
	user: null,
	error: '',
	loading: false };

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload};
		case CREATE_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case CREATE_USER_FAIL:
			return { ...state, error: 'Failed to Create User', loading: false };
		case LOGIN_USER_START:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state, error: 'Failed to Login', password: '', loading: false };
		default:
			return state;
	}
};