import SignUp from './views/SignUp'
import SignIn from './views/SignIn'

export const loggedOutUrls = [
    {
        url: '/signup',
        component: SignUp,
        name: 'Sign Up'
    },
    {
        url: '/signin',
        component: SignIn,
        name: 'Sign In'
    }
]

export const loggedInUrls = []

export const urls = loggedOutUrls.concat(loggedInUrls)