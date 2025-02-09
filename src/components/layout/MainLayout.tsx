import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
      };

    return (
        <div>
            this is main MainLayout <br/>
            <Outlet />
            <Button onClick={handleLogout}>Click me</Button>
        </div>
    );
};

export default MainLayout;