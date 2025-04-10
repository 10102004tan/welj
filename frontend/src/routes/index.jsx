import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import NotFound from "../pages/NotFound";
import PodcastDetail from '../pages/PodcastDetail';
import PodcastResult from '../pages/PodcastResult';
import PodcastListen from '../pages/PodcastListen';
import { useEffect, useState } from 'react';
import { checkAuth } from '../services/authService';
import { useAuthStore } from '../store/useStoreAuth';
import Profile from '../pages/Profile';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import PodcastAdmin from '../pages/Admin/Podcast';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import LoginForm from '../components/Form/LoginForm';
export default function AppRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated, setUserAuth,isOpen,onClose,onOpenChange } = useAuthStore();


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const data = await checkAuth();
        setIsAuthenticated(true);
        setUserAuth(data.user)
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);



  if (isAuthenticated === null || isLoading) {
    return <div className='h-screen w-screen flex justify-center items-center'></div>;
  }

  return (
    <div>
      <Router>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              let Layout;
              if (route.layout === null) {
                Layout = MainLayout;
              } else if (route.layout === "auth") {
                Layout = AuthLayout;
              }
              const Element = route.element;
              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Element />
                  </Layout>
                } />
              )
            })
          }

          {
            privateRoutes.map((route, index) => {
              let Layout = MainLayout;
              const Element = route.element;
              return (
                <Route key={index} path={route.path} element={
                  <ProtectedRoute>
                    <Layout>
                      <Element />
                    </Layout>
                  </ProtectedRoute>
                } />
              )
            })
          }

          {
            adminRoutes.map((route, index) => {
              let Layout = AdminLayout;
              const Element = route.element;
              return (
                <Route key={index} path={route.path} element={
                  <ProtectedRoute isAdminRoute={true}>
                    <Layout>
                      <Element />
                    </Layout>
                  </ProtectedRoute>
                } />
              )
            })
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {
              (onClose) => (
                <>
                  <ModalBody className='p-10'>
                    <ModalHeader className='text-center text-2xl font-semibold'>Đăng nhập</ModalHeader>
                    <LoginForm />
                  </ModalBody>
                </>
              )
            }
          </ModalContent>
        </Modal>
      </Router>
    </div>
  );
}

const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const { isAuthenticated, userAuth } = useAuthStore();
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && !isAdminRoute) {
    return children;
  }

  if (isAuthenticated && isAdminRoute && userAuth.role === "role001") {
    return children;
  }

  if (isAuthenticated && isAdminRoute && userAuth.role !== "role001") {
    return <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold text-center'>You are not authorized to access this page</h1>
      <p className='text-center'>Please contact the administrator for more information.</p>
    </div>
  }

  return <Navigate to="/login" />;
}