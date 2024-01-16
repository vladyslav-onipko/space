import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect } from 'react'; 
import { useSetRecoilState } from 'recoil';

import Header from './Header';

import { LocalStorageKeys } from '../models/Rockets';
import favRocketsState from '../store/atoms/FavRocketsState';

const SiteWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
`;

const SiteWrapperHeader = styled.div`
    flex-basis: auto;
    flex-grow: 0;
    position: relative;
    width: 100%;
`;

const SiteWrapperMain = styled.div`
    flex-grow: 1;
    min-height: 1px;
    position: relative;
    width: 100%;
`;

const Root: React.FC = () => {
    const setFavRockets = useSetRecoilState(favRocketsState);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem(LocalStorageKeys.FAVORITES)!) || [];
        setFavRockets(favorites);
    }, [setFavRockets]);

    return (
        <SiteWrapper>
            <SiteWrapperHeader>
                <Header />
            </SiteWrapperHeader>
            <SiteWrapperMain>
                <main role='main'>
                    <Outlet />
                </main>
            </SiteWrapperMain>
        </SiteWrapper>
    );
};

export default Root;