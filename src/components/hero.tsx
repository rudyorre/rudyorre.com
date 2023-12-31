import { Animation } from '@/components/animation';
import { Button } from '@/components/ui/button';

const Hero = () => (
    <div className="grid sm:grid-cols-2">
      <div className="col-auto m-auto">
        <h2 className="text-accent-foreground">
          Hi, my name is
        </h2>
        <h1 className="text-6xl font-bold tracking-tight my-1">
          Rudy Orre.
        </h1>
        <div>
            I craft solutions through code.
        </div>
          {/* <a
            style={{ color: "white" }}
            target="_blank"
            href="https://drive.google.com/file/d/1kJLOVkapYpOdyiCdLuMI2IjGSwhzzyH7/view?usp=sharing">
            <Button>
              Resume
            </Button>
          </a> */}
      </div>
      <div className="sm:block hidden col-auto max-w-[520px]">
        <Animation />
      </div>
    </div>
  );
  
  export default Hero;