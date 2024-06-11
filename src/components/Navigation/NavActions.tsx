import Link from '../../components/UI/Base/Link';
import Button from '../../components/UI/Base/Button';
import ProfileLink from '../User/ProfileLink';

import useAppSelector from '../../hooks/app/app-selector';
import useAppDispatch from '../../hooks/app/app-dispatch';
import { logout } from '../../store/user/auth/auth-actions';
import { userRouts } from '../../router/routs';

const NavActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {!isAuth && <Link type="router-link" mode="secondary" text="Sign in" to={userRouts.SIGNIN} />}
      {isAuth && <ProfileLink />}
      {isAuth && <Button text="Logout" mode="secondary" onClick={handleLogout} />}
    </>
  );
};

export default NavActions;
