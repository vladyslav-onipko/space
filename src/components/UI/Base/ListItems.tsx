import { ComponentPropsWithoutRef, ElementType } from 'react';

import { styled } from 'styled-components';

import InfoBlock from '../Helpers/InfoBlock';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 -12px;
  row-gap: 24px;
`;

const ListItem = styled.li`
  padding: 0 12px;
  width: calc(100% / 3);

  @media (max-width: 1279px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

interface ListItemsProps extends ComponentPropsWithoutRef<'ul'> {
  items: { [key: string]: any }[];
  listItem: ElementType;
}

const ListItems: React.FC<ListItemsProps> = ({ items, listItem, ...props }) => {
  const Component = listItem;

  if (!items.length) {
    return <InfoBlock />;
  }

  return (
    <List {...props}>
      {items.map((item) => {
        return (
          <ListItem key={item.id}>
            <Component item={item} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListItems;
