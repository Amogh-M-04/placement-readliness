
// Keywords for skill extraction
const SKILL_KEYWORDS = {
    "Core CS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating Systems", "Networks", "Computer Networks", "System Design", "Low Level Design", "High Level Design"],
    "Languages": ["Java", "Python", "JavaScript", "JS", "TypeScript", "TS", "C++", "C#", "Golang", "Go", "Ruby", "Swift", "Kotlin", "Rust", "PHP"],
    "Web Development": ["React", "Next.js", "Node", "Node.js", "Express", "Vue", "Angular", "HTML", "CSS", "Tailwind", "Bootstrap", "Redux", "GraphQL", "REST", "API"],
    "Data & DB": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Redis", "Cassandra", "Elasticsearch", "Kafka", "RabbitMQ"],
    "Cloud & DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "K8s", "Jenkins", "CI/CD", "Git", "GitHub", "GitLab", "Linux", "Bash", "Shell"],
    "Testing": ["Selenium", "Cypress", "Playwright", "Jest", "Mocha", "JUnit", "PyTest", "TestNG"],
    "AI/ML": ["Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV"]
};

export const analyzeJobDescription = (jdText, company, role) => {
    const text = jdText.toLowerCase();
    const extractedSkills = {};
    let totalSkillsFound = 0;

    // 1. Extract Skills
    for (const [category, keywords] of Object.entries(SKILL_KEYWORDS)) {
        const found = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
        if (found.length > 0) {
            extractedSkills[category] = [...new Set(found)]; // Remove duplicates
            totalSkillsFound += found.length;
        }
    }

    // Fallback if no skills found
    if (totalSkillsFound === 0) {
        extractedSkills["General"] = ["General Aptitude", "Communication", "Problem Solving"];
    }

    // 2. Readiness Score Calculation
    let score = 35; // Base score

    // +5 per detected category (max 30)
    const categoryCount = Object.keys(extractedSkills).length;
    score += Math.min(30, categoryCount * 5);

    // +10 if company name provided
    if (company && company.trim().length > 1) score += 10;

    // +10 if role provided
    if (role && role.trim().length > 1) score += 10;

    // +10 if JD length > 800 chars
    if (jdText.length > 800) score += 10;

    // Additional points for skill density (projects/experience usually implies many keywords)
    if (totalSkillsFound > 5) score += 5;

    // Cap at 100
    score = Math.min(100, score);


    // 3. Generate Plan & Checklist
    const { checklist, plan, questions } = generateContent(extractedSkills);

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        readinessScore: score,
        checklist,
        plan,
        questions
    };
};

const generateContent = (skills) => {
    const hasCategory = (cat) => skills[cat] && skills[cat].length > 0;

    // A. Questions
    let questions = [];
    if (hasCategory("Web Development") || hasCategory("Languages")) {
        questions.push("Explain the difference between '==' and '===' in JavaScript.");
        questions.push("What is the Virtual DOM in React and how does it work?");
        questions.push("Explain the concept of closures.");
    }
    if (hasCategory("Core CS")) {
        questions.push("Explain the 4 pillars of OOP with real-world examples.");
        questions.push("What is the difference between a process and a thread?");
        questions.push("How does a HashMap work internally?");
    }
    if (hasCategory("Data & DB")) {
        questions.push("Explain ACID properties in databases.");
        questions.push("What is the difference between SQL and NoSQL?");
        questions.push("Explain Indexing and how it improves query performance.");
    }
    if (hasCategory("Cloud & DevOps")) {
        questions.push("What is Docker and how is it different from a Virtual Machine?");
        questions.push("Explain the concept of CI/CD.");
    }

    // Fill rest with general/behavioral if needed
    const generalQuestions = [
        "Tell me about a challenging project you worked on.",
        "Where do you see yourself in 5 years?",
        "Why do you want to join this company?",
        "Describe a time you had a conflict with a team member."
    ];

    while (questions.length < 10) {
        questions.push(generalQuestions[questions.length % generalQuestions.length]);
    }
    questions = questions.slice(0, 10);


    // B. Checklist (Round-wise)
    const checklist = {
        "Round 1: Aptitude & Basics": [
            "Quantitative Aptitude (Time & Work, Percentages)",
            "Logical Reasoning (Puzzles, Series)",
            "Verbal Ability (Reading Comprehension)",
            "Resume Walkthrough Preparation"
        ],
        "Round 2: Technical (Core)": [
            "Data Structures (Arrays, Strings, Linked Lists)",
            "Algorithms (Sorting, Searching)",
            "OOP Concepts (Polymorphism, Inheritance)",
            hasCategory("Data & DB") ? "SQL Queries & Normalization" : "Basic Database Concepts"
        ],
        "Round 3: Advanced Technical": [
            "System Design (Scalability, Load Balancing)",
            "Project Deep Dive (Architecture, Challenges)",
            hasCategory("Web Development") ? "Frontend/Backend Framework specifics" : "Language specific internals",
            "Live Coding / Pair Programming"
        ],
        "Round 4: Managerial & HR": [
            "Star Method for Behavioral Questions",
            "Company Research (Values, Mission)",
            "Salary Negotiation Preparation",
            "Questions to ask the interviewer"
        ]
    };

    // C. 7-Day Plan
    const plan = [
        { day: "Day 1-2", focus: "Foundations", tasks: ["Revise Core CS concepts (OS, DBMS)", "Practice 10 Easy LeetCode problems", "Review Aptitude formulas"] },
        { day: "Day 3-4", focus: "Coding & Algorithms", tasks: ["Focus on Arrays, Trees, and Graphs", "Implement standard algorithms from scratch", "Mock test: 45 mins coding"] },
        { day: "Day 5", focus: "Projects & Resume", tasks: ["Refine resume points", "Prepare 'Project Story' for interviews", "Review system design of your projects"] },
        { day: "Day 6", focus: "Mock Interviews", tasks: ["Peer mock interview", "Record yourself answering behavioral questions", "Review weak technical areas"] },
        { day: "Day 7", focus: "Final Polish", tasks: ["Company specific research", "Rest and mindset preparation", "Review notes and cheat sheets"] }
    ];

    return { checklist, plan, questions };
};
