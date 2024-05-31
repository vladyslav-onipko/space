import { styled } from 'styled-components';

import Link from '../UI/Base/Link';

import useAppSelector from '../../hooks/app-selector';

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
  return (
    <Link type="nav-link" to={`${userRouts.PROFILE}/${id}`} onlyIcon text={name} mode="secondary">
      <ProfileImageWrap>
        <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={name} />
      </ProfileImageWrap>
    </Link>
  );
};

export default ProfileLink;
