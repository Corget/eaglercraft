
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import GameClient from '@/components/online/GameClient';
import VersionSelector from '@/components/online/VersionSelector';
import PlatformSwitcher from '@/components/online/PlatformSwitcher';
import { pcVersions, mobileVersions } from '@/config/versions';
import { pageVariants, pageTransition } from '@/utils/animations';

const OnlinePageHeader = () => (
  <motion.h1 
    className="text-3xl md:text-4xl font-bold text-foreground mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    Play Eaglercraft Online
  </motion.h1>
);

const OnlinePageForm = ({ onLaunchGame, platform, onPlatformChange, currentVersionsList, selectedVersionValue, onVersionChange }) => (
  <motion.div 
    className="bg-card p-6 md:p-8 rounded-xl shadow-2xl border border-border"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="space-y-6">
      <PlatformSwitcher platform={platform} onPlatformChange={onPlatformChange} />
      {currentVersionsList.length > 0 ? (
        <VersionSelector
          platform={platform}
          versions={currentVersionsList}
          selectedVersion={selectedVersionValue}
          onVersionChange={onVersionChange}
        />
      ) : (
        <p className="text-muted-foreground text-sm">No versions available for the selected platform.</p>
      )}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          onClick={onLaunchGame}
          size="lg"
          className="w-full minecraft-btn blue !text-lg !py-3"
          disabled={currentVersionsList.length === 0 || !selectedVersionValue}
        >
          <Play className="mr-2 h-5 w-5" />
          Launch Game
        </Button>
      </motion.div>
    </div>
  </motion.div>
);

const OnlinePageContent = ({ onLaunchGame, platform, onPlatformChange, currentVersionsList, selectedVersionValue, onVersionChange }) => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
    >
      <div className="max-w-md w-full text-center">
        <OnlinePageHeader />
        <OnlinePageForm
          onLaunchGame={onLaunchGame}
          platform={platform}
          onPlatformChange={onPlatformChange}
          currentVersionsList={currentVersionsList}
          selectedVersionValue={selectedVersionValue}
          onVersionChange={onVersionChange}
        />
      </div>
    </motion.main>
  );
};


const OnlinePage = () => {
  const [platform, setPlatform] = useState('pc'); 
  const [currentVersionsList, setCurrentVersionsList] = useState(pcVersions);
  const [selectedVersionValue, setSelectedVersionValue] = useState(pcVersions.length > 0 ? pcVersions[0].value : "");
  const [gameUrl, setGameUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    let newVersionList = [];
    if (platform === 'pc') {
      newVersionList = pcVersions;
    } else {
      newVersionList = mobileVersions;
    }
    setCurrentVersionsList(newVersionList);
    if (newVersionList.length > 0) {
      setSelectedVersionValue(newVersionList[0].value);
    } else {
      setSelectedVersionValue("");
    }
  }, [platform]);

  const handleLaunchGame = useCallback(() => {
    const versionData = currentVersionsList.find(v => v.value === selectedVersionValue);
    if (versionData) {
      setGameUrl(versionData.url);
      setIsPlaying(true);
      toast({
        title: "Launching Game",
        description: `Loading Eaglercraft ${versionData.label}. Please wait...`,
      });
    } else {
       toast({
        title: "Error",
        description: "Invalid version selected or no versions available for this platform.",
        variant: "destructive",
      });
    }
  }, [currentVersionsList, selectedVersionValue, toast]);

  const handleExitGame = useCallback(() => {
    setIsPlaying(false);
    setGameUrl("");
  }, []);

  if (isPlaying) {
    return (
      <GameClient 
        gameUrl={gameUrl} 
        selectedVersionLabel={currentVersionsList.find(v => v.value === selectedVersionValue)?.label || selectedVersionValue}
        onExit={handleExitGame}
      />
    );
  }

  return (
    <OnlinePageContent
      onLaunchGame={handleLaunchGame}
      platform={platform}
      onPlatformChange={setPlatform}
      currentVersionsList={currentVersionsList}
      selectedVersionValue={selectedVersionValue}
      onVersionChange={setSelectedVersionValue}
    />
  );
};

export default OnlinePage;
