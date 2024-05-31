import { styled } from 'styled-components';

import SearchBar from './SerchBar';
import SortBar from './SortBar';

const Bar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ToolsBar: React.FC = () => {
  return (
    <Bar>
      <SearchBar />
      <SortBar />
    </Bar>
  );
};

export default ToolsBar;
