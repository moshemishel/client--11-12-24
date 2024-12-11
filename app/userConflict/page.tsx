'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { User } from '@/types/context/AuthContext';
import { useAuth } from '@/context/AuthContext';

const UserConflict: React.FC = () => {
  const router = useRouter();
  const {login} = useAuth();
  
  const searchParams = useSearchParams();
  const currentUser: User = JSON.parse(searchParams.get('User') as string);
  console.log('currentUser:', currentUser);
  
  const requestedUrl: string = searchParams.get('Requested-url') as string;  
  const attemptedUser: string = requestedUrl?.split('/')[1];

  const isMissingUser = !currentUser;

  const handleLoginRedirect = () => {
    if (currentUser.role !== 100){router.push('/login')
    }else{
  router.push('superAdmin/login')}
  };

  const handleContinueAsCurrentUser = () => {
    if (currentUser) {
      login(currentUser);
      const updatedPathname = requestedUrl.replace(`/${attemptedUser}`, `/${currentUser.userName}`);
      if (currentUser.role !== 100){router.push(updatedPathname)}
      else {router.push(updatedPathname)}
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign:'center'}}
    >
      <Dialog open fullWidth maxWidth="sm">
      <DialogTitle 
            // sx={{ 
            //     backgroundColor: '#3f51b5',
            //     color: 'white', 
            //     fontWeight: 'bold',
            //     textAlign: 'center', 
            //     marginBottom: '2vh',
            // }}
            >
            Access Conflict Detected
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isMissingUser ? (
              "It seems there was an issue with the user information."
            ) : (
              <>
                You are currently logged in as <strong>{currentUser?.userName || 'Unknown'}</strong>, but attempted to access
                the profile of <strong>{attemptedUser || 'someone else'}</strong>.
              </>
            )}
          </DialogContentText>
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '16px' }}>
            {isMissingUser ? (
              "Please try again or log in."
            ) : (
              "Please choose how you wish to proceed:"
            )}
          </Typography>
        </DialogContent>
        <DialogActions
         style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center'}}>
          {isMissingUser ? (
            <>
              <Button variant="contained" color="secondary" onClick={handleLoginRedirect}>
                Log in
              </Button>
              {!!requestedUrl && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push(requestedUrl)}
                >
                  Try Again
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outlined" color="primary" onClick={handleLoginRedirect}>
                Log in as {attemptedUser || 'someone else'}
              </Button>
              <Button variant="contained" color="secondary" onClick={handleContinueAsCurrentUser}>
                Continue as {currentUser?.userName || 'Unknown'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserConflict;
