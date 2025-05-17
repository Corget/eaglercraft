
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VersionSelector = ({ platform, versions, selectedVersion, onVersionChange }) => {
  return (
    <div>
      <label htmlFor="version-select" className="block text-sm font-medium text-foreground mb-2 text-left">
        Choose {platform === 'pc' ? 'PC' : 'Mobile'} Version:
      </label>
      <Select value={selectedVersion} onValueChange={onVersionChange} disabled={versions.length === 0}>
        <SelectTrigger id="version-select" className="w-full">
          <SelectValue placeholder={versions.length > 0 ? "Select a version" : "No versions available"} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {versions.map((version) => (
            <SelectItem key={version.value} value={version.value}>
              {version.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VersionSelector;
