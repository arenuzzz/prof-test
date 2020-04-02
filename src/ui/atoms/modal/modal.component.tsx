import React from 'react';
import { css, cn } from '@styles/theming';
import ReactModal from 'react-modal';
// import Button from '@components/atoms/button';

import './modal.styles.scss';

type ModalProps = {
  closeButtonClassName?: string;
  isCloseButton?: boolean;
  children?: React.ReactNode;
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  overlayClassName?: string;
  className?: string;
};

// const ModalStyles = css`
//   /* :global() {
//     .ReactModal__Body--open {
//       overflow: hidden;
//     }
//   } */

//   position: absolute;
//   top: 50%;
//   left: 50%;
//   right: auto;
//   bottom: auto;
//   margin-right: -50%;
//   transform: translate(-50%, -50%);
//   background: rgb(255, 255, 255);
//   overflow: auto;
//   border-radius: 4px;
//   outline: none;

//   --horizontal-padding: 24px;
//   --vertical-padding: 20px;

//   max-width: 578px;
//   min-width: 300px;
//   width: calc(100vw - 30px);
//   min-height: 340px;

//   @media screen and (max-height: 600px) {
//     margin-top: 60px;
//     margin-bottom: 30px;
//   }
// `;

// const OverlayStyles = css`
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   right: 0px;
//   bottom: 0px;
//   z-index: 100;
//   background-color: rgba(0, 0, 0, 0.5);
//   overflow-y: scroll;
// `;

const ReactModalAdapter = ({
  children,
  isOpen = false,
  onAfterOpen = () => {},
  onRequestClose = () => {},
  overlayClassName,
  closeButtonClassName,
  className,
  isCloseButton,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      ariaHideApp={false}
      className={cn(className, 'modal')}
      overlayClassName={cn('modal-overlay', overlayClassName)}
    >
      <div className='modal-body'>{children}</div>
    </ReactModal>
  );
};

ReactModalAdapter.defaultProps = {
  isOpen: false,
  isCloseButton: true,
  onAfterOpen: () => {},
  onRequestClose: () => {},
};

// const CloseButton = ({ className, onClick }) => {
//   return (
//     <Button onClick={onClick} className={cn(className, CloseButtonClassName)}>
//       <CloseIconSvg />
//     </Button>
//   );
// };

// const CloseButtonClassName = css`
//   position: absolute;
//   top: calc(var(--vertical-padding) - 10px);
//   right: calc(var(--horizontal-padding) - 10px);

//   padding: 10px;

//   transition: transform 0.3s ease-in-out;

//   svg {
//     fill: #000;
//     opacity: 0.5;
//     width: 14px;
//     height: 14px;
//   }

//   &:hover {
//     transform: scale(1.2);
//   }
// `;

export default ReactModalAdapter;
