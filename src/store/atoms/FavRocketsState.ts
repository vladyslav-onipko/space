import { atom } from 'recoil';

import { Rocket } from '../../models/Rockets';

const favRocketsState = atom({
    key: 'favRocketsState',
    default: [] as Rocket[]
});

export default favRocketsState;