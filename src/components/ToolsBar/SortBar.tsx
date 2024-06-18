import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import useAppDispatch from '../../hooks/app/app-dispatch';
import useAppSelector from '../../hooks/app/app-selector';
import { sortPlaces } from '../../store/place/place-slice';

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

export const DEFAULT_SORT_PARAM_VALUE = 'createdAt';
export const SORT_PARAM_KEY = 'sort';

const SortBar: React.FC = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const appPlaces = useAppSelector((state) => state.places.places);

  const sortParamValue = searchParam.get(SORT_PARAM_KEY) || DEFAULT_SORT_PARAM_VALUE;
  const hasPlaces = useMemo(() => appPlaces.length, [appPlaces]);

  const [activeButton, setActiveButton] = useState<{ [key: string]: boolean }>({ [sortParamValue]: true });

  const handleAddSortParam = ({ target }: React.MouseEvent) => {
    const dataValue = (target as HTMLButtonElement).dataset.sort!;

    setSearchParams({ sort: dataValue });
    setActiveButton((prevState) => {
      return { [dataValue]: !prevState[dataValue] };
    });
  };

  useEffect(() => {
    dispatch(sortPlaces(sortParamValue));
  }, [sortParamValue, dispatch, hasPlaces]);

  return (
    <SortButtonsWrapper>
      <SortButton
        data-sort="createdAt"
        onClick={handleAddSortParam}
        style={{ backgroundColor: activeButton.createdAt ? '#2d3250' : '' }}
      >
        Date
      </SortButton>
      <SortButton
        data-sort="likes"
        onClick={handleAddSortParam}
        style={{ backgroundColor: activeButton.likes ? '#2d3250' : '' }}
      >
        Rating
      </SortButton>
    </SortButtonsWrapper>
  );
};

export default SortBar;
