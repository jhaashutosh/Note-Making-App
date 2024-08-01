import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Message = styled.p`
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const ConfirmButton = styled(Button)`
  background: #d9534f;
  color: white;

  &:hover {
    background: #c9302c;
  }
`;

const CancelButton = styled(Button)`
  background: #f0ad4e;
  color: white;

  &:hover {
    background: #ec971f;
  }
`;

const ConfirmationModal = ({ message, onClose, onConfirm }) => {


    const handleClose = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  return (
    <Backdrop onClick={handleClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
        </ButtonContainer>
      </Modal>
    </Backdrop>
  );
};

export default ConfirmationModal;
