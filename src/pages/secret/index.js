import { Layout } from '../../layout/Layout';
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';

const Secret = () => {
    return (
        <Layout>
            <Section>
                <SectionTitle>
                    Joe
                </SectionTitle>
                <SectionText>
                    Mama
                    <img src='/images/obstagoon.png'></img>
                </SectionText>
            </Section>
        </Layout>
    );
}

export default Secret;