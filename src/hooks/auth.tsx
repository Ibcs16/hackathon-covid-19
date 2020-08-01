import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  auth: boolean;
  cnpjuuid: string;
  nome: string;
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@BusinessPeak:token');
    const user = localStorage.getItem('@BusinessPeak:user');

    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;
      api.defaults.headers = {
        'x-access-token': token,
      };
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/login', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@BusinessPeak:token', token);
    localStorage.setItem(
      '@BusinessPeak:user',
      JSON.stringify(user || { cnpjuuid: 1 }),
    );
    // api.defaults.headers.authorization = `Bearer ${token}`;
    api.defaults.headers = {
      'x-access-token': token,
    };
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@BusinessPeak:token');
    localStorage.removeItem('@BusinessPeak:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem(
        '@BusinessPeak:user',
        JSON.stringify(user || { cnpjuuid: 1 }),
      );

      setData(prev => ({
        token: prev.token,
        user,
      }));
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider component');
  }

  return context;
}

export { AuthProvider, useAuth };
