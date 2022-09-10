import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CancelFriendRequestResponse,
  Friend,
  FriendRequest,
} from '../../utils/types';
import {
  cancelFriendRequestThunk,
  createFriendRequestThunk,
  fetchFriendRequestThunk,
  fetchFriendsThunk,
} from './friendsThunk';

export interface FriendsState {
  friends: Friend[];
  friendRequests: FriendRequest[];
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      const { id } = action.payload;
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== id
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        console.log('fetchFriendsThunk.fulfilled');
        console.log(action.payload.data);
        state.friends = action.payload.data;
      })
      .addCase(fetchFriendRequestThunk.fulfilled, (state, action) => {
        console.log('fetchFriendRequestsThunk.fulfilled');
        state.friendRequests = action.payload.data;
      })
      .addCase(createFriendRequestThunk.fulfilled, (state, action) => {
        console.log('createFriendRequestThunk.fulfilled');
        state.friendRequests.push(action.payload.data);
      })
      .addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      }),
});

export const { addFriendRequest, removeFriendRequest } = friendsSlice.actions;
export default friendsSlice.reducer;