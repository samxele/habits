import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text.secondary};
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Habit Maker. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;