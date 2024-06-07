import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import useAppDispatch from '../../hooks/app-dispatch';

import { sortPlaces } from '../../store/places/places-slice';

const SortButtonsWrapper = styled.div`
  background-color: var(--color-1--1);
  border-radius: 4px;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;

  @media (max-width: 767px) {
    margin: 5px;
  }
`;

const SortButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: var(--color-white);
  cursor: pointer;
  font-size: 1.6rem;
  margin: 0;
  min-height: 30px;
  min-width: 100px;
  padding: 0.5em 1.25em;
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-1--3);
  }
`;

export const DEFAULT_SORT_PARAM_VALUE = 'date';
export const SORT_PARAM_KEY = 'sort';

const SortBar: React.FC = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const sortParamValue = searchParam.get(SORT_PARAM_KEY) || DEFAULT_SORT_PARAM_VALUE;
  const [buttonActive, setButtonActive] = useState<{ [key: string]: boolean }>({ [sortParamValue]: true });

  const handleAddSortParam = ({ target }: React.MouseEvent) => {
    const dataValue = (target as HTMLButtonElement).dataset.sort!;

    setSearchParams({ sort: dataValue });
    setButtonActive((prevState) => {
      return { [dataValue]: !prevState[dataValue] };
    });
  };

  useEffect(() => {
    dispatch(sortPlaces(sortParamValue));
  }, [sortParamValue, dispatch]);

  return (
    <SortButtonsWrapper>
      <SortButton
        data-sort="date"
        onClick={handleAddSortParam}
        style={{ backgroundColor: buttonActive.date ? '#2d3250' : '' }}
      >
        Date
      </SortButton>
      <SortButton
        data-sort="rating"
        onClick={handleAddSortParam}
        style={{ backgroundColor: buttonActive.rating ? '#2d3250' : '' }}
      >
        Rating
      </SortButton>
    </SortButtonsWrapper>
  );
};

export default SortBar;
