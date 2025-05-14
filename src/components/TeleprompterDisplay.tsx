import { RefObject } from 'react';

interface TeleprompterDisplayProps {
  text: string;
  fontSize: number;
  prompterRef: RefObject<HTMLDivElement>;
}

const TeleprompterDisplay = ({ 
  text, 
  fontSize,
  prompterRef 
}: TeleprompterDisplayProps) => {
  // Split text into paragraphs
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');

  return (
    <div 
      ref={prompterRef}
      className="h-full w-full overflow-auto py-32 scrollbar-hide"
      style={{ 
        color: 'white',
        scrollBehavior: 'smooth' 
      }}
    >
      <div className="max-w-4xl mx-auto px-8">
        {paragraphs.map((paragraph, index) => (
          <p 
            key={index} 
            className="mb-8 text-center font-semibold"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: 1.5,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* Extra space at the bottom for continuous scrolling */}
      <div className="h-screen"></div>
    </div>
  );
};

export default TeleprompterDisplay;
