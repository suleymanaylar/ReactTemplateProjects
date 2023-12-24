const SessionManager = {

    getToken() {
        const token = localStorage.getItem('token');
        if (token) return token;
        else return null;
    },
    getRoleName() {
        const token = localStorage.getItem('usersRole');
        if (token) return token;
        else return null;
    },
    
    getUserName() {
        const token = localStorage.getItem('userName');
        if (token) return token;
        else return null;
    },
    setUserSession(userName, token, userId, usersRole) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('usersRole', usersRole);
    },

    removeUserSession(){
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('usersRole');
    }
}

export default SessionManager;