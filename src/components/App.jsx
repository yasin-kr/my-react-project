import { Alert } from './Alert';
import { LoginButton } from './LoginButton';
import { FollowButton } from './FollowButton';
import { UserMenu } from './UserMenu';

export default function App() {
  return (
    <>
      <Alert variant="info" outlined>
        Would you like to browse our recommended products?
      </Alert>
      <Alert variant="error">
        There was an error during your last transaction
      </Alert>
      <Alert variant="success" elevated>
        Payment received, thank you for your purchase
      </Alert>
      <Alert variant="warning" outlined elevated>
        Please update your profile contact information
      </Alert>
      <UserMenu name="Yasin" />
      <LoginButton />
      <FollowButton />
    </>
  );
}
