import { apiFetch } from './api';

export const loginRequest = async (credentials) => {
  return await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

export const registerRequest = async (userData) => {
  return await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const getProfileRequest = async () => {
  return await apiFetch('/auth/profile');
};
