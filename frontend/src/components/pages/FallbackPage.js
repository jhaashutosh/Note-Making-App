import React from 'react'
import image from '../../assets/image.png';
import styled from 'styled-components';
import { MdLock as Lock } from "react-icons/md";

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    height: 100%;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
`;

function FallbackPage() {
  return (
    <Main>
        <Container>
            <ImageContainer><Image src={image} alt="background" /></ImageContainer>
            <h2>Pocket Notes</h2>
            <p style={{ width: '50%'}}>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </Container>
        <Footer><Lock />end-to-end encrypted</Footer>
    </Main>
  )
}

export default FallbackPage