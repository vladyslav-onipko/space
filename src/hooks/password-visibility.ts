import { useState, useCallback } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface PasswordState {
  icon: IconProp;
  type: string;
}

const EYE_ICON: IconProp = ['far', 'eye'];
const EYESLASH_ICON: IconProp = ['far', 'eye-slash'];
const PASSWORD_TYPE = 'password';
const TEXT_TYPE = 'text';

const usePasswordVisibility = () => {
  const [passwordVisibilityState, setPassworVisibilityState] = useState<PasswordState>({
    icon: EYE_ICON,
    type: PASSWORD_TYPE,
  });

  const changePasswordVisibility = useCallback(() => {
    setPassworVisibilityState((prevState) => {
      const type = prevState.type === PASSWORD_TYPE ? TEXT_TYPE : PASSWORD_TYPE;
      const icon = type === PASSWORD_TYPE ? EYE_ICON : EYESLASH_ICON;
      return { icon, type };
    });
  }, []);

  return { icon: passwordVisibilityState.icon, type: passwordVisibilityState.type, changePasswordVisibility };
};

export default usePasswordVisibility;
