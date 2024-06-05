import { useCallback, useContext } from 'react';

import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debounce from 'lodash.debounce';

import hiddenTextStyles from '../../assets/css/helpers/hiddenText';

import { UrlParamsContext } from '../../store/http/url-params-context';

const SearchInputControl = styled.div`
  display: flex;
  position: relative;
  width: fit-content;

  @media (max-width: 767px) {
    margin: 5px;
  }
`;

const SearchLabel = styled.label`
  ${hiddenTextStyles};
`;

const SearchInput = styled.input`
  background-color: var(--color-white);
  border: 1px solid var(--color-1--1);
  border-radius: 4px;
  color: var(--color-1--3);
  font-size: 1.5rem;
  font-style: italic;
  margin: 0;
  min-height: 30px;
  overflow: hidden;
  padding: 0.5em 1.95em 0.5em 1.25em;
  width: 100%;

  &::placeholder {
    color: var(--color-1--3);
    font-style: italic;
    font-size: 1.4rem;
  }

  &:focus {
    box-shadow: 0px 0px 23px -3px rgba(45, 50, 80, 0.5);
    outline: 1px solid var(--color-1--1);
    outline-offset: 0;
  }
`;

const SearchInputIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  & svg path {
    fill: var(--color-1--1);
  }
`;

const DEBOUNCE_DELAY = 500;

const SearchBar: React.FC = () => {
  const { setUrlParams } = useContext(UrlParamsContext);

  const debounceSearch = useCallback(
    (value: string) => {
      debounce(() => {
        setUrlParams({ search: value, page: 1 });
      }, DEBOUNCE_DELAY)();
    },
    [setUrlParams]
  );

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(target.value);
  };

  return (
    <SearchInputControl>
      <SearchLabel>Search</SearchLabel>
      <SearchInput type="text" name="search" id="search" placeholder="search..." onChange={handleInputChange} />
      <SearchInputIcon>
        <FontAwesomeIcon icon={['fas', 'search']} />
      </SearchInputIcon>
    </SearchInputControl>
  );
};

export default SearchBar;
