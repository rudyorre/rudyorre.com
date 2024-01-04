import { Animation } from '@/components/animation';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Hero = () => (
    <div className="grid sm:grid-cols-2">
      <div className="col-auto m-auto">
        <h2 className="text-muted-foreground">
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
          <Link href="https://github.com/rudyorre" target="_blank">
            <FontAwesomeIcon icon={faGithub} className={`fa-3x text-muted-foreground cursor-pointer
              "transform transition-transform duration-300 ease-in-out hover:translate-x-1`
              }
            />
          </Link>
          <Link href="https://linkedin.com/in/rudyorre" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className={`fa-3x text-muted-foreground cursor-pointer
              "transform transition-transform duration-300 ease-in-out hover:translate-x-1`
              }
            />
          </Link>
          <Link href="https:/instagram.com/rudyorre" target="_blank">
            <FontAwesomeIcon icon={faInstagram} className={`fa-3x text-muted-foreground cursor-pointer
              "transform transition-transform duration-300 ease-in-out hover:translate-x-1`
              }
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