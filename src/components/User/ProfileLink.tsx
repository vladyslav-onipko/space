import { styled } from 'styled-components';

import Link from '../UI/Base/Link';

import useAppSelector from '../../hooks/app/app-selector';

import { userRouts } from '../../router/routs';

const ProfileImageWrap = styled.span`
  border: 1px solid var(--color-2--1);
  border-radius: 50%;
  height: 35px;
  overflow: hidden;
  width: 35px;
`;

const ProfileLink: React.FC = () => {
  const { name, image, id } = useAppSelector((state) => state.auth.user);
  const profileRoute = userRouts.PROFILE.replace(':id', id);

  return (
    <Link type="nav-link" to={profileRoute} onlyIcon text={name} mode="secondary" tooltipContent="profile">
      <ProfileImageWrap>
        <img src={image} alt={name} height="33" width="33" />
      </ProfileImageWrap>
    </Link>
  );
};

export default ProfileLink;
