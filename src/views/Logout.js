export const Logout = () => {
    localStorage.removeItem('Token');
    window.location.href = '';
    return null
}
