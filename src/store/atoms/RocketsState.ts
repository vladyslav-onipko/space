import { atom } from 'recoil';

import { Rocket } from '../../models/Rockets';

const rocketsState = atom({
    key: 'rocketsState',
    default: [] as Rocket[]
});

export default rocketsState;