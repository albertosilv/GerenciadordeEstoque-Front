class Auth {

    constructor(history) {
        this.history = history;
    }

    login({ expires_at, id_token, profileObj }) {
        localStorage.setItem('id_token', id_token);
        localStorage.setItem('expires_at', expires_at);
        this.history.push('/dashboard');
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.history.push('/');
    }

    isAuthenticated() {
        const expires_at = Number(JSON.parse(localStorage.getItem('expires_at')));
        if (!expires_at) {
            return false;
        }
        return (new Date().getTime() < expires_at);
    }
}

export default Auth;
