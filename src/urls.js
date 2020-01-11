import { withSnackbar } from 'notistack';

import {SignIn, FriendRequests, SignUp} from './views'
import {Title} from './components'

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
    },
].map(link => ({
    ...link,
    component: withSnackbar(Title(link.component, link.name))
}))

export const loggedInUrls = [
    {
        url: '/friend-requests',
        component: FriendRequests,
        name: 'Friend Requests'
    }
].map(link => ({
    ...link,
    component: withSnackbar(Title(link.component, link.name))
}))

// export const urls = loggedOutUrls.concat(loggedInUrls).map(link => ({
//     ...link,
//     component: withSnackbar(link.component)
// }))