import { Button } from '../ui/button';

export const SignupButton = () => {
  return (
    <Button variant={'outline'} className=' w-32'>
      <a href='/auth/login/'>サインアップ</a>
    </Button>
  );
};
