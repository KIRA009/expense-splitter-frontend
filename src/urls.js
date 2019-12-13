import { withSnackbar } from 'notistack';

import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import FriendRequests from './views/FriendRequests'
import Title from './components/Title'

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