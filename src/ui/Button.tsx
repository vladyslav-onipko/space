import { styled } from 'styled-components';

import { Button as ButtonModel } from '../models/Button';
import { NavLink, Link } from 'react-router-dom';
import { HiddenText } from '../assets/css/hiddenText';

import { defaulButtonStyles } from '../assets/css/buttons';
import { defaultLinkStyles } from '../assets/css/buttons';

const ButtonEl = styled.button`
    ${defaulButtonStyles};
`;

const NavLinkEl = styled(NavLink)`
    ${defaultLinkStyles};
`;

const LinkEl = styled(Link)`
    ${defaulButtonStyles};
    text-decoration: none;
`;

const ButtonText = styled.span`
    font-family: var(--typo-1);
    font-size: 2.4rem;
    font-weight: 600;
    pointer-events: none;
    text-transform: uppercase;

    @media (max-width: 767px) {
        font-size: 1.8rem;
    }
`;

const ButtontTextHidden = styled.span`
    ${HiddenText};
`;

const ButtonIcon = styled.span`
    pointer-events: none;
    
    & svg {
        display: block;
        height: 100%;
        width: 100%;
    }
`;

const Button: React.FC<React.PropsWithChildren<ButtonModel>> = (props) => {
    let content = (
        <ButtonEl 
            type="button"
            title={props.hiddenText}
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {!props.onlyIcon && <ButtonText>{props.children}</ButtonText>}
            {props.onlyIcon && <ButtontTextHidden>{props.hiddenText}</ButtontTextHidden>}
            {props.icon && <ButtonIcon aria-hidden="true">{props.icon}</ButtonIcon>}
        </ButtonEl>
    );

    if (props.navLink) {
        content = (
            <NavLinkEl to={props.href || '#'} title={props.hiddenText}>
                {!props.onlyIcon && <ButtonText>{props.children}</ButtonText>}
                {props.onlyIcon && <ButtontTextHidden>{props.hiddenText}</ButtontTextHidden>}
                {props.icon && <ButtonIcon aria-hidden="true">{props.icon}</ButtonIcon>}
            </NavLinkEl>
        );
    }

    if (props.link) {
        content = (
            <LinkEl to={props.href || '#'} title={props.hiddenText}>
                {!props.onlyIcon && <ButtonText>{props.children}</ButtonText>}
                {props.onlyIcon && <ButtontTextHidden>{props.hiddenText}</ButtontTextHidden>}
                {props.icon && <ButtonIcon aria-hidden="true">{props.icon}</ButtonIcon>}
            </LinkEl>
        );
    }

    return content;
};

export default Button;