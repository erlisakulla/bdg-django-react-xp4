import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import {useHistory} from 'react-router-dom';

export default function Logout() {
    const history = useHistory();

    useEffect(() => {
        axiosInstance
            .post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
        })
            .then(res => {
                console.log(res);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                window.location = '/login';
            });

    });
    return <div>Logout</div>;
}