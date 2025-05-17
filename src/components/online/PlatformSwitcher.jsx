
import React from 'react';
import { Label } from '@/components/ui/label';
import { Smartphone, Monitor } from 'lucide-react';

const PlatformSwitcher = ({ platform, onPlatformChange }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-4">
      <Label className="text-sm font-medium text-foreground mr-2">
        Select Platform:
      </Label>
      <div className="flex items-center p-1 rounded-full bg-muted border border-border space-x-1">
        <button
          onClick={() => onPlatformChange('pc')}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${platform === 'pc' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'hover:bg-accent text-muted-foreground'}`}
          aria-label="Select PC Platform"
        >
          <Monitor className="h-5 w-5" />
        </button>
        <button
          onClick={() => onPlatformChange('mobile')}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${platform === 'mobile' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'hover:bg-accent text-muted-foreground'}`}
          aria-label="Select Mobile Platform"
        >
          <Smartphone className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PlatformSwitcher;
