import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';
import { HiCubeTransparent } from 'react-icons/hi';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons, Span } from './HeaderStyles';

import { links } from '../../constants/constants';

const Header = () =>  (
  <Container>
    <Div1>
      <Link href='/'>
        <div style={{ display: "flex", alignItems: "center", color: "white", marginBottom: "20px" }}>
          <HiCubeTransparent size="3rem" style={{ paddingRight: '5px' }}/><Span>Rudy Orre</Span>
        </div>
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
      {/*<li>
        <Link href="/user">
          <NavLink>Users</NavLink>
        </Link>
      </li>*/}
    </Div2>
    <Div3>
      <SocialIcons href={links.github} target="_blank">
        <AiFillGithub size="3rem" />
      </SocialIcons>
      <SocialIcons href={links.linkedin} target="_blank">
        <AiFillLinkedin size="3rem" />
      </SocialIcons>
      <SocialIcons href={links.instagram} target="_blank">
        <AiFillInstagram size="3rem" />
      </SocialIcons>
    </Div3>
  </Container>
);

export default Header;
