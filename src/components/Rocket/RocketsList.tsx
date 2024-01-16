import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import favRocketsState from '../../store/atoms/FavRocketsState';
import totalFavRockets from '../../store/selectors/TotalFavRockets';
import { LocalStorageKeys } from '../../models/Rockets';
import RocketItem from './RocketItem';
import { Section } from '../../assets/css/section';
import { HiddenText } from '../../assets/css/hiddenText';
import Button from '../../ui/Button';

const RocketContainer = styled.div`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    text-align: center;

    @media (max-width: 767px) {
        padding: 0 10px;
    }
`;

const RocketList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0 -12px;
    padding-top: 65px;
    row-gap: 24px;
`;

const RocketTitle = styled.h2`
    ${HiddenText};
`;

const RocketListItem = styled.li`
    padding: 0 12px;
    width: calc(100% / 3);

    @media (max-width: 1279px) {
        width: 50%;
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;

const ClearButton = styled(Button)`
    background-color: transparent;
    color: var(--color-3--3);
    margin-left: auto;

    & span {
        font-family: var(--typo-2);
        font-weight: 300;
        text-transform: none;
    }
`;

const RocketsList: React.FC = () => {
    const [rockets, setRockets] = useRecoilState(favRocketsState);
    const hasRockets = useRecoilValue(totalFavRockets);

    const deleteFvoriteHndler = (id: string) => {
        setRockets((prevRockets) => {
            const updatedRockets = prevRockets.filter(r => r.id !== id);
            localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(updatedRockets));

            return updatedRockets;
        });
    };

    const clearFvoriteHandler = () => {
        localStorage.removeItem(LocalStorageKeys.FAVORITES);
        setRockets([]);
    };

    let content = <p>Your favorite Rockets will be here. Plese add one!</p>;

    if (hasRockets) {
        content = (
            <RocketList>
                {rockets.map(rocket => {
                    return (
                        <RocketListItem key={rocket.id}>
                            <RocketItem
                                name={rocket.name}
                                description={rocket.description}
                                img={rocket.img}
                                onDeleteFavite={() => deleteFvoriteHndler(rocket.id)}
                            />
                        </RocketListItem>
                    );
                })}
            </RocketList>
        );
    }

    return (
        <Section>
            <RocketContainer>
                <RocketTitle>Favorites</RocketTitle>
                {hasRockets && <ClearButton onClick={clearFvoriteHandler}>Clear all</ClearButton>}
                {content}
            </RocketContainer>
        </Section>
    );
};

export default RocketsList;
