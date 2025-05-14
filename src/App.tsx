import { useEffect, useState, useRef } from 'react';
import './index.css';
import TeleprompterControls from './components/TeleprompterControls';
import TeleprompterDisplay from './components/TeleprompterDisplay';
import { AlignLeft, ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Text } from 'lucide-react';

export function App() {
  // Teleprompter state
  const [text, setText] = useState<string>('Enter your script here...\n\nThis is a teleprompter app where you can adjust text size, scrolling speed, and background color.\n\nClick the play button to start the teleprompter.');
  const [fontSize, setFontSize] = useState<number>(48);
  const [speed, setSpeed] = useState<number>(2);
  const [backgroundColor, setBackgroundColor] = useState<string>('#000000');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  
  const prompterRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Scrolling logic
  useEffect(() => {
    if (isPlaying) {
      scrollIntervalRef.current = window.setInterval(() => {
        setScrollPosition(prev => prev + speed);
        if (prompterRef.current) {
          prompterRef.current.scrollTop = scrollPosition;
        }
      }, 50);
    } else if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isPlaying, speed, scrollPosition]);
  
  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Reset teleprompter
  const resetTeleprompter = () => {
    setIsPlaying(false);
    setScrollPosition(0);
    if (prompterRef.current) {
      prompterRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="bg-slate-800 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <Text className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">PromptPal</h1>
        </div>
        <button 
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarVisible ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: Text input and controls */}
        <div 
          className={`${sidebarVisible ? 'w-1/3' : 'w-0'} bg-slate-100 flex flex-col overflow-hidden border-r border-slate-300 transition-all duration-300 ease-in-out`}
        >
          <div className={`${sidebarVisible ? 'p-4 opacity-100' : 'p-0 opacity-0 overflow-hidden'} flex-1 flex flex-col transition-all duration-300 ease-in-out`}>
          <h2 className="text-lg font-semibold mb-3">Script</h2>
          <textarea 
            className="flex-1 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4 font-mono"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your script here..."
          />
          
          <TeleprompterControls 
            fontSize={fontSize}
            setFontSize={setFontSize}
            speed={speed}
            setSpeed={setSpeed}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
          />
          </div>
        </div>
        
        {/* Right panel: Teleprompter display */}
        <div className={`${sidebarVisible ? 'w-2/3' : 'w-full'} flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}>
          <div 
            className="flex-1 overflow-hidden relative"
            style={{ backgroundColor }}
          >
            <TeleprompterDisplay
              text={text}
              fontSize={fontSize}
              prompterRef={prompterRef}
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={resetTeleprompter}
                className="p-3 bg-slate-800 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all text-white"
                aria-label="Reset"
              >
                <RotateCcw size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-slate-800 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all text-white"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
