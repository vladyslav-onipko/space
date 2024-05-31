import { ComponentPropsWithoutRef } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LinkModeConfig } from './link';

export type ButtonModeConfig = 'default' | 'secondary' | 'primary';

export interface ButtonStylesConfig {
  $mode?: ButtonModeConfig | LinkModeConfig;
  $onlyIcon?: boolean;
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  mode?: ButtonModeConfig;
  icon?: IconProp;
  onlyIcon?: boolean;
  text: string;
}
