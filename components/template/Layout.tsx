/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import Header from 'components/organism/Header';
import Footer from 'components/organism/Footer';
import styled from '@emotion/styled';

const Main = styled.main`
  padding: 0 16px;
  width: 100%;
`;

const Layout = ({ children }: { children?: ReactNode }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
