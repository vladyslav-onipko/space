import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import RocketItem from './RocketItem';
import { Section } from '../../assets/css/section';
import Button from '../../ui/Button';

import { RocketsList as RocketModelList} from '../../models/Rockets';
import { LocalStorageKeys } from '../../models/Rockets';
import { HiddenText } from '../../assets/css/hiddenText';
import { removeFavoriteRocket, removeAllFavoriteRocket } from '../../utils/http';
import favRocketsState from '../../store/atoms/FavRocketsState';

import { ReactComponent as Bin } from '../../assets/img/bin.svg';
import { secondaryButtonStyles } from '../../assets/css/buttons';

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

const SecondaryActionButton = styled(Button)`
    ${secondaryButtonStyles};
`;

const RocketsList: React.FC<RocketModelList> = ({ rockets }) => {
    const setFavRockets = useSetRecoilState(favRocketsState);

    const { mutate: mutateDelete } = useMutation({
        mutationFn: removeFavoriteRocket,
        onSuccess(_, rocketFbId) {
            setFavRockets((prevRockets) => {
                const updatedRockets = prevRockets.filter(r => r.fbId !== rocketFbId);
                const rocketsId = updatedRockets.map(r => r.id);
                localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(rocketsId));
                return updatedRockets;
            });
        },
    });

    const { mutate: mutateClear } = useMutation({
        mutationFn: removeAllFavoriteRocket,
        onSuccess() {
            localStorage.removeItem(LocalStorageKeys.FAVORITES);
            setFavRockets([]);
        }
    });

    const deleteFvoriteHndler = (id: string) => {
        mutateDelete(id);
    };

    const clearFvoriteHandler = () => {
        mutateClear();
    };

    return (
        <Section>
            <RocketContainer>
                <RocketTitle>Favorites</RocketTitle>
                <ClearButton onClick={clearFvoriteHandler}>Clear all</ClearButton>
                <RocketList>
                    {rockets.map(rocket => {
                        return (
                            <RocketListItem key={rocket.id}>
                                <RocketItem
                                    name={rocket.name}
                                    description={rocket.description}
                                    img={rocket.img}
                                    action={
                                        <SecondaryActionButton
                                            onlyIcon={true}
                                            icon={<Bin />}
                                            hiddenText='Delete'
                                            onClick={() => deleteFvoriteHndler(rocket.fbId)}
                                        />
                                    }
                                />
                            </RocketListItem>
                        );
                    })}
                </RocketList>
            </RocketContainer>
        </Section>
    );
};

export default RocketsList;
