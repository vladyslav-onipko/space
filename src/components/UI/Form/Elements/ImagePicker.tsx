import { ChangeEvent, useRef, useState, useEffect, memo } from 'react';

import { styled } from 'styled-components';

import Input from './../Elements/Input';
import Button from '../../Base/Button';

import { ImagePickerProps } from '../../../../models/form';
import generateNumber from '../../../../utils/helpers/generate-number';
import generateWords from '../../../../utils/helpers/generate-words';

const ImagePickWrapper = styled.div`
  align-items: flex-end;
  display: flex;

  @media (max-width: 1279px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const ImagePickPicture = styled.picture`
  align-items: center;
  border: 1px solid var(--color-1--3);
  display: flex;
  justify-content: center;
  height: 250px;
  width: 250px;
`;

const ImagePickBtn = styled(Button)`
  ${ImagePickWrapper} & {
    box-shadow: unset;
    margin-left: 20px;

    @media (max-width: 1279px) {
      margin: 20px 0 0;
    }
  }
`;

const ImagePicker: React.FC<ImagePickerProps> = ({
  imagePath,
  name,
  id,
  required,
  label,
  onSetFieldValue,
  onSetFieldTouched,
  ...props
}) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const handlePickImage = () => {
    inputRef.current!.click();
  };

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    if (currentTarget.files && currentTarget.files.length === 1) {
      const file = currentTarget.files[0];

      setFile(file);
      onSetFieldTouched(name, true);
      onSetFieldValue(name, file);
    }
  };

  useEffect(() => {
    const fileReader = new FileReader();

    const createPreview = async () => {
      if (!file) {
        const imageUrl = imagePath
          ? `${process.env.REACT_APP_BACKEND_URL}/${imagePath}`
          : `${process.env.REACT_APP_IMAGE_SERVICE_URL}/800/700?random=${generateNumber()}`;

        try {
          const response = await fetch(imageUrl);

          if (!response.ok) {
            throw new Error('Image not loaded');
          }

          const blob = await response.blob();
          const fileImage = new File([blob], 'avatar', { type: 'image/jpg' });

          fileReader.onload = () => setPreviewUrl(fileReader.result as string);
          fileReader.readAsDataURL(fileImage);
          onSetFieldValue(name, fileImage);
        } catch (e: any) {
          setError(e.message);
          setPreviewUrl('');
        }
      } else {
        fileReader.onload = () => setPreviewUrl(fileReader.result as string);
        fileReader.readAsDataURL(file);
      }
    };
    createPreview();
  }, [file, name, imagePath, onSetFieldValue]);

  const previewEl = previewUrl ? (
    <img src={previewUrl} alt={file?.name || generateWords(3)} height="250" width="250" />
  ) : (
    <span>{error}</span>
  );

  return (
    <Input
      ref={inputRef}
      type="file"
      label={label}
      name={name}
      id={id}
      value=""
      accept=".jpg,.png,.jpeg"
      hiddenInput
      required={required}
      onChange={handleChange}
    >
      <ImagePickWrapper {...props}>
        <ImagePickPicture>{previewEl}</ImagePickPicture>
        <ImagePickBtn text="Pick image" mode="primary" onClick={handlePickImage} />
      </ImagePickWrapper>
    </Input>
  );
};

export default memo(ImagePicker);
