import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from './AuthContext'
const useIdleLogout = () => {
  const router = useRouter();
  const {logout} = useAuth()
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastActivityTime = Date.now();

  

    const handleActivity = () => {
      const currentTime = Date.now();
      const idleTime = currentTime - lastActivityTime;

      lastActivityTime = currentTime;

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        logout();
        router.replace('/login?reason=seesion-expired')
      }, 10 * 60 * 1000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [router]);
};

export default useIdleLogout;
