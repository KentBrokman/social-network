import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";


const SET_USERS = 'SET_USERS';
const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const FOLLOW_TOGGLED = 'FOLLOW_TOGGLED';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_IS_FETCHING = "SET_IS_FETCHING";

const initialState = {
    users: [],
    friends: null,
    pageSize: 8,
    pageNumber: 1,
    totalUsersCount: null,
    isFetching: false,
    togglingFollowIds: []
}


const usersReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users],
                totalUsersCount: action.totalUsersCount,
                pageNumber: action.pageNumber
            };
        }
        case SET_FRIENDS: {
            return {
                ...state,
                friends: [...action.friends]
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
            }
        }
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: true})
            }
        }
        case FOLLOW_TOGGLED: {
            return {
                ...state,
                togglingFollowIds: action.isFetching ?
                    [...state.togglingFollowIds, action.userId] :
                    state.togglingFollowIds.filter(id => id !== action.userId)
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: {
            return state;
        }
    }
}

const setUsers = (users, totalUsersCount, pageNumber) => ({type: SET_USERS, users, totalUsersCount, pageNumber});
const setFriends = (friends) => ({type: SET_FRIENDS, friends})
const unfollowSuccessed = (userId) => ({type: UNFOLLOW, userId});
const followSuccessed = (userId) => ({type: FOLLOW, userId});
const followIsToggling = (isFetching, userId) => ({type: FOLLOW_TOGGLED, isFetching, userId});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const getUsers = (pageSize, pageNumber) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const data = await usersApi.getUsers(pageSize, pageNumber);
    if (!data.error) {
        dispatch(setUsers(data.items, data.totalCount, pageNumber))
    }
    dispatch(setIsFetching(false));
}

export const getFriends = () => async (dispatch) => {
    const data = await usersApi.getFriends();
    if (!data.error) {
        dispatch(setFriends(data.items))
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(followIsToggling(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(followIsToggling(false, userId))
}
export const unfollowUser = (userId) =>  (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersApi.unfollowUser, unfollowSuccessed);
}
export const followUser = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersApi.followUser, followSuccessed);
}


export default usersReducer;