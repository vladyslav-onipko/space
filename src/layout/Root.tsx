import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import Header from './Header';

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