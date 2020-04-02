import React from 'react';
import Tooltip from 'react-tooltip';
import { styled, cn } from '@styles/theming';
import { Icon } from '@ui/quarks/icon';
// import { Tooltip } from '@ui/atoms/tooltip';

export type InputFileValue = {
  fileName: string;
  data: string[];
  error: string;
  isReading: boolean;
};

export type InputFileLinkProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange: (value: InputFileValue) => void;
  value: InputFileValue;
  filterArray: (value: string, idx: number, array: string[]) => boolean;
  maxReadingSize?: number;
};

const StyledInputFileWrapper = styled('div')`
  width: 40px;
  height: 40px;

  position: relative;

  .tooltip {
    height: 40px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    opacity: 1;

    font-size: 12px;
    line-height: 15px;
    background-color: ${(p) => p.theme.colors.black_1};
  }

  input[type='file'] {
    display: none;
  }

  .btn-upload {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(p) => p.theme.colors.white_1};
    border: 1px solid ${(p) => p.theme.colors.gray_2};
    border-radius: 4px;
    outline: none;

    transition-duration: ${(p) => p.theme.transitionDurations[0]};
    transition-timing-function: ease;
    transition: border-color, opacity, background-color;
  }

  .file-upload {
    width: 25px;
    height: 25px;
    fill: ${(p) => p.theme.colors.gray_2};

    /* pointer-events: none; */
  }

  .file-info {
    width: 100%;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    .file-reset {
      display: none;

      width: 28px;
      height: 28px;

      fill: ${(p) => p.theme.colors.gray_1};
    }

    .links-count {
      display: block;

      color: ${(p) => p.theme.colors.blue_1};
    }
  }

  &:hover {
    .file-info {
      .file-reset {
        display: block;
      }

      .links-count {
        display: none;
      }
    }
  }
`;

export function InputFileLink({
  onChange,
  filterArray,
  className,
  maxReadingSize = 100,
  value = {
    fileName: '',
    data: [],
    isReading: false,
  },
}: InputFileLinkProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function onClick() {
    if (value.fileName || value.data.length > 0) {
      onChange({
        isReading: false,
        error: '',
        fileName: '',
        data: [],
      });
    } else if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { currentTarget } = e;

    const files = currentTarget.files as FileList;
    const fileName = currentTarget.value;
    const file = files[0];

    if (file) {
      if (file.type !== 'text/plain') {
        onChange({
          ...value,
          data: [],
          fileName: '',
          error: 'Incorrect file type. Only .txt file extension is allowed',
        });

        return;
      }

      if (file.size > 2000000) {
        onChange({
          ...value,
          data: [],
          fileName: '',
          error: 'Exceeded size 2MB',
        });

        return;
      }

      const reader = new FileReader();

      reader.onload = (readerEvt) => {
        if (
          readerEvt.target &&
          readerEvt.target.result &&
          typeof readerEvt.target.result === 'string'
        ) {
          const filteredData = readerEvt.target.result
            .split(/\s/)
            .filter(Boolean)
            .filter(filterArray);

          const data = Array.from(new Set(filteredData)).slice(
            0,
            maxReadingSize
          );

          const error =
            filteredData.length > maxReadingSize
              ? `File includes more than ${maxReadingSize} links. If you want to export next ${maxReadingSize} links, edit the file`
              : '';

          onChange({
            ...value,
            error,
            fileName,
            data,
            isReading: false,
          });
        }
      };

      reader.onerror = () => {
        onChange({
          ...value,
          error: 'Failed to read file',
          fileName,
          data: [],
          isReading: false,
        });
      };

      onChange({
        ...value,
        error: '',
        fileName,
        data: [],
        isReading: true,
      });

      reader.readAsText(file);
    }
  }

  const { fileName, isReading } = value;
  const count = value.data ? value.data.length : 0;

  return (
    <StyledInputFileWrapper className={cn(className, 'file-link')}>
      <input
        ref={inputRef}
        type='file'
        accept='.txt'
        value={value.fileName}
        onChange={handleChange}
      />
      <button type='button' className={cn('btn-upload')} onClick={onClick}>
        {!isReading ? (
          fileName || value.data.length > 0 ? (
            <div
              className='file-info'
              data-tip
              data-for='upload-links-count-tooltip'
            >
              <Icon variant='close' className='file-reset' />
              <span className='links-count'>{count}</span>
              <Tooltip
                id='upload-links-count-tooltip'
                effect='solid'
                place='right'
                className='tooltip'
              >
                Number of successfully validated links
              </Tooltip>
            </div>
          ) : (
            <div className='file-info' data-tip data-for='upload-links-tooltip'>
              <Icon variant='attachment' className='file-upload' />
              <Tooltip
                id='upload-links-tooltip'
                effect='solid'
                place='right'
                className='tooltip'
              >
                Export from .txt file
              </Tooltip>
            </div>
          )
        ) : null}
      </button>
    </StyledInputFileWrapper>
  );
}
