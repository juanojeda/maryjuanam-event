import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 1.8rem;
`;

export default ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>;
