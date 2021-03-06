import {withSnackbar} from 'notistack';

import {SignIn, FriendRequests, SignUp, Friends, Logout, Groups} from './views';

export const loggedOutUrls = [
    {
        url: '/signin',
        component: SignIn,
        name: 'Sign In'
    },
    {
        url: '/signup',
        component: SignUp,
        name: 'Sign Up'
    }
].map(link => ({
    ...link,
    component: withSnackbar(link.component, link.name)
}));

export const loggedInUrls = [
    {
        url: '/friend-requests',
        component: FriendRequests,
        name: 'Friend Requests'
    },
    {
        url: '/friends',
        component: Friends,
        name: 'Friends'
    },
    {
        url: '/groups',
        component: Groups,
        name: 'Groups'
    },
    {
        url: '/log-out',
        component: Logout,
        name: 'Logout'
    }
].map(link => ({
    ...link,
    component: withSnackbar(link.component, link.name)
}));
