
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Smartphone, Monitor } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const allDownloadVersions = [
  { 
    version: "1.20", 
    label: "Release 1.20 (EaglyMC)",
    description: "Latest Unofficial Version. PC Only.",
    fileName: "Eaglercraft_1.20(EaglyMC).zip",
    size: "34MB",
    url: "https://drive.google.com/uc?export=download&id=1iF9sAw2KvoKvIh6Qdg4pnUuamIwTCqXo",
    platform: "pc",
    unofficial: true
  },
  { 
    version: "1.12.2", 
    label: "Release 1.12.2",
    description: "Recommended official version with many features.",
    fileName: "Eaglercraft-1.12.2.zip",
    size: "30MB",
    url: "https://drive.google.com/uc?export=download&id=1F433XDLi2P0VYB7iD3_H8q4fLmMAgJyE",
    platform: "pc"
  },
  { 
    version: "1.8.8", 
    label: "Release 1.8.8",
    description: "Popular official version, great for server compatibility.",
    fileName: "Eaglercraft-1.8.8.zip",
    size: "18MB",
    url: "https://drive.google.com/uc?export=download&id=1JvN4PDfA3zukXUCOsln1DAzr--6TVgsu",
    platform: "pc"
  },
  { 
    version: "1.6.4", 
    label: "Release 1.6.4",
    description: "Popular official version.",
    fileName: "Eaglercraft_1.6.4.zip",
    size: "21MB",
    url: "https://drive.google.com/uc?export=download&id=1AQIEl8QhjxleYuAzyXgIZPAsub4ihvoI",
    platform: "pc"
  },
  { 
    version: "1.5.2", 
    label: "Release 1.5.2",
    description: "The classic official Eaglercraft experience.",
    fileName: "Eaglercraft-1.5.2.zip",
    size: "22MB",
    url: "https://drive.google.com/uc?export=download&id=1dxcYjNEnWRKxOofCwRae8mkPjzfjm8vg",
    platform: "pc"
  },
  { 
    version: "b1.7.3", 
    label: "Beta 1.7.3",
    description: "Experience an older beta version of Eaglercraft.",
    fileName: "Eaglercraft_b1.7.3.zip",
    size: "16MB",
    url: "https://drive.google.com/uc?export=download&id=1x1XtzAOY3TqDygQkScMjuproaO-PA7GH",
    platform: "pc"
  },
  { 
    version: "b1.3", 
    label: "Beta 1.3",
    description: "Another classic beta version.",
    fileName: "Eaglercraft_b1.3.zip",
    size: "4MB",
    url: "https://drive.google.com/uc?export=download&id=1FeUyRtkngcvjGlAuY7u9bOSuh71utI8f",
    platform: "pc"
  },
  { 
    version: "b1.1", 
    label: "Beta 1.1",
    description: "A Classic beta version.",
    fileName: "Eaglercraft_b1.1.zip",
    size: "23MB",
    url: "https://drive.google.com/uc?export=download&id=1VH_PKjTf-9Z7i4s9HwOiXgUzkykMRYBy",
    platform: "pc"
  },
  { 
    version: "a1.2.6", 
    label: "Alpha 1.2.6",
    description: "Delve into the alpha stages of Eaglercraft.",
    fileName: "Eaglercraft_a1.2.6.zip",
    size: "8MB",
    url: "https://drive.google.com/uc?export=download&id=1R2qmd-6bkejUEuVay9FPz5gTlT1gplDL",
    platform: "pc"
  },
  { 
    version: "a1.1.2", 
    label: "Alpha 1.1.2",
    description: "An early alpha build of Eaglercraft.",
    fileName: "Eaglercraft_a1.1.2.zip",
    size: "30MB",
    url: "https://drive.google.com/uc?export=download&id=1i8mBIR-bcmw9wKq0kBZxpTyEVNYt5Atg",
    platform: "pc"
  },
  { 
    version: "Indev", 
    label: "Indev",
    description: "The very early In-Development versions.",
    fileName: "Eaglercraft_Indev.zip",
    size: "1MB",
    url: "https://drive.google.com/uc?export=download&id=167uXF0Zij08zFqsLrEmdVXHgw0oH1R1q",
    platform: "pc"
  },
  { 
    version: "Infdev", 
    label: "Infdev",
    description: "One of the First Versions.",
    fileName: "Eaglercraft_Infdev.zip",
    size: "2MB",
    url: "https://drive.google.com/uc?export=download&id=1PtEW3zygxNXS4Jr5jTNanlrVcEF-A6K0",
    platform: "pc"
  }
];

const mobileCompatibleVersions = [ 
  "1.8.8", "1.5.2", "b1.7.3", "b1.3", "a1.2.6"
];

const DownloadCard = ({ item, index }) => {
  const { toast } = useToast();
  const handleDownload = (itemToDownload) => {
    toast({
      title: "Download Starting",
      description: `Your download for ${itemToDownload.fileName} will begin shortly.`,
    });
    
    const link = document.createElement('a');
    link.href = itemToDownload.url;
    link.setAttribute('download', itemToDownload.fileName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      key={item.version + (item.unofficial ? '-unofficial' : '')}
      className="bg-card p-6 rounded-xl shadow-xl border border-border transition-shadow hover:shadow-2xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
          <h3 className="text-2xl font-semibold text-primary mb-1">{item.label}</h3>
          <p className="text-muted-foreground mb-2 text-sm">{item.description}</p>
          <p className="text-xs text-muted-foreground/80">File: {item.fileName} ({item.size})</p>
        </div>
        <Button 
          onClick={() => handleDownload(item)}
          size="lg" 
          className="w-full sm:w-auto minecraft-btn green !text-base !py-2.5 flex items-center justify-center"
        >
          <DownloadCloud className="mr-2 h-5 w-5" />
          Download
        </Button>
      </div>
    </motion.div>
  );
};

const DownloadsPlatformSwitcher = ({ platform, onPlatformChange }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <Label className="text-base font-medium text-foreground mr-2">
        Select Platform for Official Clients:
      </Label>
      <div className="flex items-center p-1 rounded-full bg-muted border border-border space-x-1">
        <button
          onClick={() => onPlatformChange('pc')}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${platform === 'pc' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'hover:bg-accent text-muted-foreground'}`}
          aria-label="Select PC Platform"
        >
          <Monitor className="h-6 w-6" />
        </button>
        <button
          onClick={() => onPlatformChange('mobile')}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${platform === 'mobile' ? 'bg-primary text-primary-foreground shadow-md scale-105' : 'hover:bg-accent text-muted-foreground'}`}
          aria-label="Select Mobile Platform"
        >
          <Smartphone className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const DownloadsSection = ({ title, versions, platform }) => {
  if (!versions || versions.length === 0) {
    if (platform) {
       return <p className="text-center text-muted-foreground mt-4">No official clients available for {platform}.</p>;
    }
    return null;
  }

  return (
    <>
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold text-foreground mt-10 mb-6 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <div className="space-y-6">
        {versions.map((item, index) => (
          <DownloadCard item={item} index={index} key={`${platform || 'unofficial'}-${item.version}`} />
        ))}
      </div>
    </>
  );
};


const DownloadsPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("pc");

  const officialVersions = useMemo(() => {
    return allDownloadVersions
      .filter(item => !item.unofficial)
      .filter(item => {
        if (selectedPlatform === "pc") return true;
        return mobileCompatibleVersions.includes(item.version);
      });
  }, [selectedPlatform]);

  const unofficialClients = useMemo(() => {
    return allDownloadVersions.filter(item => item.unofficial && item.platform === "pc");
  }, []);


  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow container mx-auto px-4 py-12 md:py-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Download Eaglercraft Clients
        </motion.h1>

        <DownloadsPlatformSwitcher platform={selectedPlatform} onPlatformChange={setSelectedPlatform} />

        <DownloadsSection 
          title={`Official Clients (${selectedPlatform === 'pc' ? 'PC' : 'Mobile'})`}
          versions={officialVersions}
          platform={selectedPlatform}
        />
        
        {selectedPlatform === "pc" && unofficialClients.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border">
            <DownloadsSection 
              title="Unofficial Clients (PC)"
              versions={unofficialClients}
            />
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default DownloadsPage;
