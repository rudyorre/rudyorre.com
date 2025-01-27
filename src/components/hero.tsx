import { Animation } from '@/components/animation';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { links } from '@/constants/links';

const Hero = () => (
    <div className="grid sm:grid-cols-2">
      <div className="col-auto m-auto">
        <h2 className="text-secondary-foreground/50">
          Hi, my name is
        </h2>
        <h1 className="text-6xl font-bold tracking-tight my-1 text-primary">
          Rudy Orre.
        </h1>
        <div className="text-lg text-primary/50">
          I'm a software engineer at <a href="https://x.company" target="_blank" className="text-primary hover:text-primary/25 cursor-pointer transition-colors">Google X</a> building <a href="https://x.company/blog/posts/introducing-chorus/" target="_blank" className="text-primary hover:text-primary/25 cursor-pointer transition-colors">Chorus</a>.
        </div>
        <div className="flex gap-4 mt-4">
          <Link href={links.linkedin} target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className={`fa-3x text-secondary-foreground/50 hover:text-primary cursor-pointer transform transition-all duration-300 ease-in-out hover:translate-x-1`}
            />
          </Link>
          <Link href={links.github} target="_blank">
            <FontAwesomeIcon icon={faGithub} className={`fa-3x text-secondary-foreground/50 hover:text-primary cursor-pointer transform transition-all duration-300 ease-in-out hover:translate-x-1`}
            />
          </Link>
        </div>
      </div>
      <div className="sm:block hidden col-auto max-w-[520px]">
        <Animation />
      </div>
    </div>
  );
  
  export default Hero;