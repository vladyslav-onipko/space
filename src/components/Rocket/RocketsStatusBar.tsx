import { styled } from 'styled-components';

const StatusBar = styled.p`
  color: var(--color-4--5);
  font-size: 2.2rem;
  font-style: italic;
  margin-bottom: 40px;
  padding: 0 15px;
  text-align: center;
`;

interface RocketsStatusBarProps {
  loaded: number | string;
  from: number | string;
}

const RocketsStatusBar: React.FC<RocketsStatusBarProps> = ({ loaded, from }) => {
  return (
    <StatusBar>
      Loaded {loaded} rockets from {from}
    </StatusBar>
  );
};

export default RocketsStatusBar;
