import { ComponentPropsWithoutRef } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type ButtonModeConfig = 'default' | 'secondary' | 'primary' | 'favorite';

export interface ButtonStylesConfig {
  $mode?: ButtonModeConfig;
  $onlyIcon?: boolean;
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  mode?: ButtonModeConfig;
  icon?: IconProp;
  onlyIcon?: boolean;
  text: string;
  tooltipContent?: string;
}
