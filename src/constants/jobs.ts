export interface Job {
    role: string,
    company: string,
    dates: string,
    tags: string[],
    featured?: boolean,
    description: string[],
}

export const jobs: Job[] = [
    {
        role: 'Software Engineer',
        company: 'Google X',
        dates: 'June 2024 - Current',
        tags: ['java', 'react', 'ts', 'gcp'],
        featured: true,
        description: [
            "Building Chorus",
        ],
    },
    {
        role: 'Software Engineer',
        company: 'One Step GPS',
        dates: 'Feb 2024 - June 2024',
        tags: ['go', 'vue', 'ts'],
        featured: true,
        description: [
            "Architected and shipped critical features for real-time vehicle tracking platform using Vue/TypeScript frontend and Golang/SQL backend, including a streamlined web app entry point with WebSocket integration for live updates.",
        ]
    },
    {
        role: 'Full-Stack Software Engineer',
        company: 'rudyorre.com',
        dates: 'Nov 2023 - Jan 2024',
        tags: ['react', 'node', 'flask', 'aws'],
        featured: true,
        description: [
            "Contributed to the development of production-ready client projects, ensuring timely delivery and exceeding expectations. Simultaneously, led the effort of building and maintaining a comprehensive library of reusable React components and Flask utilities, expediting development for future client projects and measured a 20% increase in developer productivity.",
            "Played a pivotal role in securing over 10 client projects exceeding $300,000 in cumulative value by leveraging technical expertise to provide accurate milestone timelines and assessing technical feasibility during project intake.",
        ]
    },
    {
        role: 'Software Engineer Intern',
        company: 'Arista Networks',
        dates: 'Jun 2023 - Oct 2023',
        tags: ['python', 'shell', 'gitlab ci/cd'],
        featured: false,
        description: [
            "Developed a Python-based tool that automates the testing of Arista's Two-Way Active Measurement Protocol (TWAMP) implementations, enabling comprehensive and efficient testing processes. Uncovered and addressed scalability challenges by revealing a limitation preventing TWAMP from efficiently handling more than 1000 concurrent sessions, a discovery crucial for future optimizations.",
            "Implemented extensive network interactions via API requests, demonstrating adeptness at handling complex, large-scale network sessions.",
            "Integrated CI/CD pipelines through GitLab, facilitated comprehensive unit testing, and maintained clear, thorough documentation.",
        ]
    },
    {
        role: 'Technical Product Manager Intern',
        company: 'Southern California Edison',
        dates: 'Jun 2022 - Sep 2022',
        tags: ['python', 'sklearn', 'tensorflow'],
        featured: false,
        description: [
            "Facilitated the development of an internal project management/intake tool by compiling a product backlog and organizing meetings with a team of 3 developers and regularly meeting with 6 distinct stakeholder groups for updates and requirements.",
            "Designed the architecture of the data processing pipeline of this project management tool, which spans 5 levels of management from start to end.",
            "Integrated CI/CD pipelines through GitLab, facilitated comprehensive unit testing, and maintained clear, thorough documentationImplemented several natural language processing pipelines, with deep learning methods such as LSTMs and Transformers to categorize over 32,000 projects from the field with over a 93% accuracy.",
        ]
    },
    {
        role: 'Software Engineer',
        company: 'Daily Bruin',
        dates: 'Jan 2022 - Jun 2022',
        tags: ['next', 'postgres', 'docker'],
        featured: false,
        description: [
            "Maintained and developed dailybruin.com, a high-traffic website receiving hundreds of thousands of views monthly, emphasizing scalability and maintainability.",
            "Utilized a robust tech stack including Next.js for front-end development, PostgreSQL for database management, and Docker for containerization, ensuring the platform's reliability and performance.",
            "Implemented incremental static regeneration to optimize content delivery, enhancing the user experience while maintaining efficiency in content updates.",
        ]
    },
    {
        role: 'AI Researcher (stipend)',
        company: 'UCLA Interactive Systems Lab',
        dates: 'Jun 2021 - Oct 2021',
        tags: ['pytorch', 'pandas', 'jupyter'],
        featured: false,
        description: [
            "Collaborated with faculty and graduate students to investigate reinforcement learning (RL) in the context of partial information environments.",
            "Utilized Python libraries and frameworks including NumPy, SciPy, Pandas, MatPlotLib, and PyTorch to produce RL agents and analyze their performance.",
            "Published research in the UCLA Summer Undergraduate Research Journal and presented our research at the UCLA SPUR Research Showcase.",
        ]
    },
    {
        role: 'Automation Specialist / Tutor',
        company: 'Outlier.org',
        dates: 'Apr 2021 - Nov 2021',
        tags: ['python', 'selenium'],
        featured: false,
        description: [
            "Provided academic assistance for Calculus I and Intro to Statistics.",
            "Assisted students with homework questions and test preparation strategies.",
            "Wrote scripts in Python (Selenium) to scrape data and categorize over 5,000 customer tickets to help automate Outlier's documentation process.",
        ]
    },
    {
        role: 'Software Engineer',
        company: 'Berkeley ACE Lab',
        dates: 'Jun 2021 - Sep 2021',
        tags: ['python', 'javascript'],
        featured: false,
        description: [
            "Contributed significantly to the Algorithms and Computing for Education (ACE) Lab, demonstrating proficiency in developing 10+ dynamic problem sets for El Camino College and UC Berkeley's Foundations of Data Science courses (1,500 students).",
            "Employed the PrairieLearn assessment framework, utilizing Python, Pandas, Matplotlib, and the Datascience module to create engaging and effective problem-solving exercises.",
        ],
    },
    {
        role: 'Computer Science and Mathematics Tutor',
        company: 'El Camino College',
        dates: 'Dec 2019 - Jun 2021',
        tags: ['cpp', 'java', 'vs'],
        featured: false,
        description: [
            "Provided academic assistance on courses spanning computer science, mathematics, and statistics.",
            "Communicated with students both in real life and now through virtual meetings.",
            "Specialized primarily in topics such as data structures/algorithms, multi-variable calculus, and statistics.",
        ],
    },
    {
        role: "Statistics Teacher's Assistant",
        company: 'El Camino College',
        dates: 'Jun 2020 - Aug 2020',
        tags: ['scipy'],
        featured: false,
        description: [
            "Supplemented course with tutoring sessions.",
            "Evaluated and graded students’ exams and other classwork.",
            "Collaborated with professors to create statistics study guides.",
        ],
    },
    {
        role: 'Software Engineer Intern',
        company: 'Vision13',
        dates: 'Aug 2020 - Dec 2020',
        tags: ['pytorch'],
        featured: false,
        description: [
            "Employed advanced techniques in PyTorch to fortify the learning models' robustness, resulting in a 25% reduction in model inference time.",
            "Engineered and implemented solutions resulting in a remarkable 150% boost in data-processing pipeline efficiency, reducing the average data preprocessing time from 10 minutes to 4 minutes.",
            "Played a pivotal role in fostering an Agile work culture, contributing to daily meetings and biweekly Sprints, ensuring seamless collaboration and accelerated project development.",
        ],
    },
    {
        role: 'Google CSSI Scholar',
        company: 'Google',
        dates: 'Aug 2019 - Sep 2019',
        tags: ['django'],
        featured: false,
        description: [
            "Worked collaboratively with peers, professors, and Googlers to design and implement a dynamic website. Leveraged the Python-based Django framework running on the Google App Engine to tie the front-end to a robust database.",
            "Demonstrated proficiency in problem-solving and coding practices while actively contributing to the development of a website that utilized the skills acquired during the CSSI program.",
        ],
    },
    {
        role: 'Assistant Track Coach',
        company: 'Redondo Premier Youth Track Club',
        dates: 'Sep 2018 - Sep 2019',
        tags: [],
        featured: false,
        description: [],
    },
] as const;
