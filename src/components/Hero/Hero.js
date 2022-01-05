import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <h2 style={{ paddingTop: "20px", color: "#64ffda"}}>
        Hi, my name is
      </h2>
      <SectionTitle main center style={{ padding: "0" }}>
        Rudy Orre.
      </SectionTitle>
      <SectionText>
      I am a Junior studying computer science at UCLA.
      </SectionText>
      <Button onClick={() => window.open('https://drive.google.com/file/d/1kJLOVkapYpOdyiCdLuMI2IjGSwhzzyH7/view?usp=sharing', '_blank') }>Resume</Button>
    </LeftSection>
  </Section>
);

export default Hero;