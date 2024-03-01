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
        <div className="text-lg">
            I build full-stack applications, automate workflows, and
            mess around with AI/ML. Also just graduated UCLA.
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
          <Link href={links.resume} target="_blank" className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium text-secondary-foreground/50 transition duration-300 ease-out border-2 border-secondary-foreground/50 hover:border-primary rounded-lg shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-primary-foreground duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease border-2 border-secondary-foreground/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-secondary-foreground/50 transition-all duration-300 transform group-hover:translate-x-full ease">Resume</span>
            <span className="relative invisible">Resume</span>
          </Link>
        </div>
      </div>
      <div className="sm:block hidden col-auto max-w-[520px]">
        <Animation />
      </div>
    </div>
  );
  
  export default Hero;