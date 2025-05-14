import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

interface TeleprompterControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const FONT_SIZE_OPTIONS = [32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72];
const COLOR_OPTIONS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Blue', value: '#001428' },
  { name: 'Dark Green', value: '#002800' },
  { name: 'Dark Purple', value: '#190028' },
  { name: 'Dark Red', value: '#280000' },
  { name: 'Grey', value: '#1a1a1a' },
];

const TeleprompterControls = ({
  fontSize,
  setFontSize,
  speed,
  setSpeed,
  backgroundColor,
  setBackgroundColor,
}: TeleprompterControlsProps) => {
  const [showCustomColor, setShowCustomColor] = useState(false);
  
  const selectedColorName = COLOR_OPTIONS.find(option => option.value === backgroundColor)?.name || 'Custom';

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Settings</h2>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Font Size</label>
        <Select.Root 
          value={fontSize.toString()} 
          onValueChange={(value) => setFontSize(Number(value))}
        >
          <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Select.Value>{fontSize}px</Select.Value>
            <Select.Icon>
              <ChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>
          
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-slate-200">
              <Select.Viewport className="p-1">
                {FONT_SIZE_OPTIONS.map((size) => (
                  <Select.Item
                    key={size}
                    value={size.toString()}
                    className="relative flex items-center px-6 py-2 text-sm rounded hover:bg-slate-100 cursor-pointer outline-none"
                  >
                    <Select.ItemText>{size}px</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <label className="block text-sm font-medium text-slate-700">Scrolling Speed</label>
          <span className="text-sm text-slate-500">{speed}</span>
        </div>
        <Slider.Root
          className="relative flex items-center select-none h-5 w-full"
          value={[speed]}
          max={10}
          min={1}
          step={0.5}
          onValueChange={(values) => setSpeed(values[0])}
        >
          <Slider.Track className="bg-slate-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border border-slate-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Speed control"
          />
        </Slider.Root>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Background Color</label>
        
        <Select.Root 
          value={showCustomColor ? "custom" : backgroundColor} 
          onValueChange={(value) => {
            if (value === "custom") {
              setShowCustomColor(true);
            } else {
              setShowCustomColor(false);
              setBackgroundColor(value);
            }
          }}
        >
          <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2 border border-slate-300" 
                style={{ backgroundColor }}
              />
              <Select.Value>{selectedColorName}</Select.Value>
            </div>
            <Select.Icon>
              <ChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>
          
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-slate-200">
              <Select.Viewport className="p-1">
                {COLOR_OPTIONS.map((color) => (
                  <Select.Item
                    key={color.value}
                    value={color.value}
                    className="relative flex items-center px-6 py-2 text-sm rounded hover:bg-slate-100 cursor-pointer outline-none"
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2 border border-slate-300" 
                        style={{ backgroundColor: color.value }}
                      />
                      <Select.ItemText>{color.name}</Select.ItemText>
                    </div>
                  </Select.Item>
                ))}
                <Select.Item
                  value="custom"
                  className="relative flex items-center px-6 py-2 text-sm rounded hover:bg-slate-100 cursor-pointer outline-none"
                >
                  <Select.ItemText>Custom</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        
        {showCustomColor && (
          <input 
            type="color" 
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full h-10 p-1 border border-slate-300 rounded cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default TeleprompterControls;
