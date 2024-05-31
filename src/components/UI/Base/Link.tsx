import { NavLink as NavLinkEl, Link as LinkEl } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

import HiddenTextStyles from '../../../assets/css/helpers/hiddenText';
import {
  regularLinkStyles,
  defaultLinkStyles,
  secondaryLinkStyles,
  primaryLinkStyles,
  linkTextStyles,
  linkIconStyles,
} from '../../../assets/css/ui/base/links';

import { AnchorProps, RouterLinkProps, NavLinkProps, LinkStylesConfig } from '../../../models/link';

const LinkText = styled.span<LinkStylesConfig>`
  ${linkTextStyles}
`;

const LinkIcon = styled.span<LinkStylesConfig>`
  ${linkIconStyles};
`;

const LinkTextHidden = styled.span`
  ${HiddenTextStyles};
`;

const Anchor = styled.a<LinkStylesConfig>`
  ${({ $mode }) => ($mode === 'regular' ? regularLinkStyles : null)};
  ${({ $mode }) => ($mode === 'default' ? defaultLinkStyles : null)};
  ${({ $mode }) => ($mode === 'secondary' ? secondaryLinkStyles : null)};
  ${({ $mode }) => ($mode === 'primary' ? primaryLinkStyles : null)};
`;

const NavLink = styled(NavLinkEl)<LinkStylesConfig>`
  ${({ $mode }) => ($mode === 'regular' ? regularLinkStyles : null)};
  ${({ $mode }) => ($mode === 'default' ? defaultLinkStyles : null)};
  ${({ $mode }) => ($mode === 'secondary' ? secondaryLinkStyles : null)};
  ${({ $mode }) => ($mode === 'primary' ? primaryLinkStyles : null)};
`;

const RouterLink = styled(LinkEl)<LinkStylesConfig>`
  ${({ $mode }) => ($mode === 'regular' ? regularLinkStyles : null)};
  ${({ $mode }) => ($mode === 'default' ? defaultLinkStyles : null)};
  ${({ $mode }) => ($mode === 'secondary' ? secondaryLinkStyles : null)};
  ${({ $mode }) => ($mode === 'primary' ? primaryLinkStyles : null)};
`;

const Link: React.FC<AnchorProps | RouterLinkProps | NavLinkProps> = ({
  icon,
  mode,
  onlyIcon,
  text,
  children,
  ...props
}) => {
  const LinkContent = (
    <>
      {children}
      {!onlyIcon && <LinkText>{text}</LinkText>}
      {onlyIcon && <LinkTextHidden>{text}</LinkTextHidden>}
      {icon && (
        <LinkIcon $onlyIcon={!!onlyIcon} aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </LinkIcon>
      )}
    </>
  );

  switch (props.type) {
    case 'nav-link':
      return (
        <NavLink $onlyIcon={!!onlyIcon} $mode={mode || 'default'} {...props}>
          {LinkContent}
        </NavLink>
      );
    case 'router-link':
      return (
        <RouterLink $onlyIcon={!!onlyIcon} $mode={mode || 'default'} {...props}>
          {LinkContent}
        </RouterLink>
      );
  }

  return (
    <Anchor $onlyIcon={!!onlyIcon} $mode={mode || 'default'} {...props}>
      {LinkContent}
    </Anchor>
  );
};

export default Link;
