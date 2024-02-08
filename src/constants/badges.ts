/**
 * A Map containing badge information, where keys are badge names and values are badge image URLs.
 *
 * Badges are commonly used to visually represent technologies, tools, or platforms used in a project.
 *
 * @remarks
 * - Badge styling is mostly derived from https://github.com/Ileriayo/markdown-badges.
 * - Consider using a dedicated badge library for more advanced features and customization options.
 */
export const badges: Map<string, string> = new Map(
    Object.entries({
        'python': 'https://img.shields.io/badge/Python-3670A0?style=flat&logo=python&logoColor=ffdd54',
        'gitlab ci/cd': 'https://img.shields.io/badge/Gitlab%20CI/CD-%23181717.svg?style=flat&logo=gitlab&logoColor=white',
        'next': 'https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white',
        'postgres': 'https://img.shields.io/badge/Postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white',
        'docker': 'https://img.shields.io/badge/Docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white',
        'pytorch': 'https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=flat&logo=PyTorch&logoColor=white',
        'pandas': 'https://img.shields.io/badge/Pandas-%23150458.svg?style=flat&logo=pandas&logoColor=white',
        'jupyter': 'https://img.shields.io/badge/Jupyter-%23FA0F00.svg?style=flat&logo=jupyter&logoColor=white',
        'javascript': 'https://img.shields.io/badge/JavaScript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E',
        'cpp': 'https://img.shields.io/badge/C++-%2300599C.svg?style=flat&logo=c%2B%2B&logoColor=white',
        'java': 'https://img.shields.io/badge/Java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white',
        'vs': 'https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=flat&logo=visual-studio&logoColor=white',
        'django': 'https://img.shields.io/badge/Django-%23092E20.svg?style=flat&logo=django&logoColor=white',
        'sklearn': 'https://img.shields.io/badge/Scikit--Learn-%23F7931E.svg?style=flat&logo=scikit-learn&logoColor=white',
        'tensorflow': 'https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=flat&logo=TensorFlow&logoColor=white',
        'shell': 'https://img.shields.io/badge/Shell-%23121011.svg?style=flat&logo=gnu-bash&logoColor=white',
        'scipy': 'https://img.shields.io/badge/SciPy-%230C55A5.svg?style=flat&logo=scipy&logoColor=%white',
        'selenium': 'https://img.shields.io/badge/Selenium-43B02A.svg?&style=flat&logo=selenium&logoColor=white',
        'react': 'https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB',
        'node': 'https://img.shields.io/badge/Node-6DA55F?style=flat&logo=node.js&logoColor=white',
        'flask': 'https://img.shields.io/badge/Flask-%23000.svg?style=flat&logo=flask&logoColor=white',
        'aws': 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white',
    })
);
