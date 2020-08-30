import axios from 'axios';
import { showAlert } from "./alerts";
//- script(src='https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js')
//- script(src='/js/mapbox.js')
//- script(src='/js/login.js')
export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            window.setTimeout(() => {
                showAlert('success', 'Logged in successfully!');
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
};