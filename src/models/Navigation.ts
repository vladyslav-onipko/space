import { ComponentPropsWithoutRef } from 'react';

export interface NavItem extends ComponentPropsWithoutRef<'li'> {
  text: string;
  href: string;
}

export interface NavListProps extends ComponentPropsWithoutRef<'ul'> {
  items: NavItem[];
}
