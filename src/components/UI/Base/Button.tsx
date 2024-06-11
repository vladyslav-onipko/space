import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import hiddenTextStyles from '../../../assets/css/helpers/hiddenText';
import {
  defaultButtonStyles,
  secondaryButtonStyles,
  primaryButtonStyles,
  disabledButtonStyles,
  buttonTextStyles,
  buttonIconStyles,
  favoriteButtonStyles,
} from '../../../assets/css/ui/base/buttons';

import { ButtonProps, ButtonStylesConfig } from '../../../models/button';

const ButtonText = styled.span`
  ${buttonTextStyles};
`;

const ButtonIcon = styled.span<ButtonStylesConfig>`
  ${buttonIconStyles};
`;

const ButtontTextHidden = styled.span`
  ${hiddenTextStyles};
`;

const ButtonEl = styled.button<ButtonStylesConfig>`
  ${({ $mode }) => ($mode === 'default' ? defaultButtonStyles : null)};
  ${({ $mode }) => ($mode === 'secondary' ? secondaryButtonStyles : null)};
  ${({ $mode }) => ($mode === 'primary' ? primaryButtonStyles : null)};
  ${({ $mode }) => ($mode === 'favorite' ? favoriteButtonStyles : null)};
  ${disabledButtonStyles};
`;

const Button: React.FC<ButtonProps> = ({ type, mode, icon, onlyIcon, text, children, ...props }) => {
  return (
    <ButtonEl type={type || 'button'} $onlyIcon={!!onlyIcon} $mode={mode || 'default'} {...props}>
      {children}
      {!onlyIcon && <ButtonText>{text}</ButtonText>}
      {onlyIcon && <ButtontTextHidden>{text}</ButtontTextHidden>}
      {icon && (
        <ButtonIcon $onlyIcon={onlyIcon} aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </ButtonIcon>
      )}
    </ButtonEl>
  );
};

export default Button;
