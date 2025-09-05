import React, { useState, useEffect } from 'react';

interface Statement {
  input: string;
  return: string;
}

interface StatementProps {
  statement: Statement;
  isVisible: boolean;
}

interface StatementsProps {
  statements: Statement[];
}

const statements: Statement[] = [
  {
    input: 'location',
    return: '"Banglore"',
  },
  {
    input: 'contact',
    return:
      '["<a href="mailto:j.chi2241@gmail.com">j.chi2241@gmail.com</a>", "<a rel="noopener" href="https://www.linkedin.com/in/justin-chi-64b12b37">LinkedIn</a>", "<a rel="noopener" href="https://github.com/vai0">github</a>"]',
  },
  {
    input: 'resume',
    return:
      '<a rel="noopener" style="color: #2563eb;" href="/Resume(Nishant Sharma).pdf" target="_blank">Resume(Nishant Sharma).pdf</a>',
  },
  {
    input: 'education',
    return:
      '"B.Tech in computer science and engineering, SIT"',
  },
  {
    input: 'skills',
    return:
      '["Cpp", "TypeScript", "Python", "Next.js", "Express.js", "Raylib", "WebAssembly", "Linux", "Docker", "Tmux", "Git", "CCNA", "Nutanix Cloud Platform", "VMware", "PostgreSQL", "Redis"]',
  },
];

const Statement: React.FC<StatementProps> = ({ statement, isVisible }) => {
  if (!isVisible) return null;
    
  return (
    <div className="flex flex-col mb-3">
      <div className="flex items-center">
        <span className="text-green-400 mr-1">$</span>
        <span className="text-white">{statement.input}</span>
      </div>
      <div 
        className="text-yellow-300 pl-4"
        dangerouslySetInnerHTML={{ __html: statement.return }}
      />
    </div>
  );
};

const Cursor: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
    
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);
    
  return (
    <div className="flex items-center mt-1">
      <span className="text-green-400 mr-1">$</span>
      <span className={`w-2 h-5 bg-white ${visible ? 'opacity-100' : 'opacity-0'}`}></span>
    </div>
  );
};

const Terminal: React.FC = () => {
  const [visibleStatements, setVisibleStatements] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
    
  useEffect(() => {
    let currentIndex = 0;
        
    const typingInterval = setInterval(() => {
      if (currentIndex < statements.length) {
        setVisibleStatements(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 700);
        
    return () => clearInterval(typingInterval);
  }, []);
    
  return (
    <div className="flex items-center justify-center w-full h-[400px] object-cover">
      <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-xl">
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-center flex-grow text-gray-300 text-sm">nishant-terminal</div>
        </div>
        <div className="bg-black p-4 font-mono text-sm overflow-auto h-96">
          <div className="flex items-center mb-4">
            <span className="text-green-400 mr-1">$</span>
            <span className="text-white">whoami</span>
          </div>
          <div className="text-yellow-300 pl-4 mb-6">Nishant Sharma - Software Engineer</div>
                    
          {statements.map((statement, index) => (
            <Statement key={index} statement={statement} isVisible={visibleStatements.includes(index)} />
          ))}
                    
          {isTyping ? null : <Cursor />}
        </div>
      </div>
    </div>
  );
};

export default Terminal;