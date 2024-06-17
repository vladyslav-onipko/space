import { ComponentPropsWithoutRef } from 'react';
import { LinkProps, NavLinkProps as NavigationLinkProps } from 'react-router-dom';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type LinkModeConfig = 'default' | 'secondary' | 'primary' | 'regular';

export interface LinkStylesConfig {
  $mode?: LinkModeConfig;
  $onlyIcon?: boolean;
}

interface DefaultLinkProps {
  mode?: LinkModeConfig;
  icon?: IconProp;
  onlyIcon?: boolean;
  text: string;
  tooltipContent?: string;
}

export interface AnchorProps extends DefaultLinkProps, ComponentPropsWithoutRef<'a'> {
  type: 'anchor';
  href: string;
}

export interface RouterLinkProps extends DefaultLinkProps, LinkProps {
  type: 'router-link';
}

export interface NavLinkProps extends DefaultLinkProps, NavigationLinkProps {
  type: 'nav-link';
}
