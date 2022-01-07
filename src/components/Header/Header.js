import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';
import { HiCubeTransparent } from 'react-icons/hi';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons, Span } from './HeaderStyles';

const Header = () =>  (
  <Container>
    <Div1>
      <Link href='/'>
        <a style={{ display: "flex", alignItems: "center", color: "white", marginBottom: "20px" }}>
          <HiCubeTransparent size="3rem" style={{ paddingRight: '5px' }}/><Span>Rudy Orre</Span>
        </a>
      </Link>
    </Div1>
    <Div2>
      {/*<li>
        <Link href="#projects">
          <NavLink>Projects</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#technologies">
          <NavLink>Technologies</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#about">
          <NavLink>About</NavLink>
        </Link>
      </li>*/}
      <li>
        <Link href="/user">
          <NavLink>Users</NavLink>
        </Link>
      </li>
    </Div2>
    <Div3>
      <SocialIcons href="https://github.com/rudyorre" target="_blank">
        <AiFillGithub size="3rem" />
      </SocialIcons>
      <SocialIcons href="https://linkedin.com/in/rudyorre" target="_blank">
        <AiFillLinkedin size="3rem" />
      </SocialIcons>
      <SocialIcons href="https://instagram.com/rudyorre" target="_blank">
        <AiFillInstagram size="3rem" />
      </SocialIcons>
    </Div3>
  </Container>
);

export default Header;
