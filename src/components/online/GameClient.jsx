
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const GameClient = ({ gameUrl, selectedVersionLabel, onExit }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const gameContainerRef = useRef(null);
  const { toast } = useToast();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen().then(() => {
        if (iframeRef.current) {
          iframeRef.current.focus();
        }
      }).catch(err => {
        toast({
            title: "Fullscreen Error",
            description: `Could not enter fullscreen: ${err.message}`,
            variant: "destructive"
          });
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const attemptAutoFullscreen = () => {
      if (gameContainerRef.current && gameContainerRef.current.requestFullscreen && !document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().then(() => {
          if (iframeRef.current) {
            iframeRef.current.focus(); 
          }
        }).catch(err => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      } else if (iframeRef.current && document.fullscreenElement) {
         iframeRef.current.focus();
      }
    };

    const timeoutId = setTimeout(attemptAutoFullscreen, 500);
    return () => clearTimeout(timeoutId);
  }, []);


  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (isCurrentlyFullscreen && iframeRef.current) {
        iframeRef.current.focus();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && document.fullscreenElement) {
        event.preventDefault();
        toast({
          title: "Fullscreen Active",
          description: "Use the in-page button or F11 to exit fullscreen.",
          duration: 3000,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      ref={gameContainerRef} 
      className={`w-full bg-black rounded-lg shadow-2xl border border-border relative flex flex-col overflow-hidden ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-100px)] md:h-[calc(100vh-80px)] mt-4'}`}
    >
       {!isFullscreen && (
        <div className="bg-card/80 backdrop-blur-sm p-2 flex justify-between items-center border-b border-border">
          <Button onClick={onExit} variant="ghost" size="sm" className="text-foreground hover:bg-accent px-3 py-1.5">
            <X className="h-5 w-5 mr-1" />
            <span className="text-sm">Exit Game</span>
          </Button>
          <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="text-foreground hover:bg-accent px-3 py-1.5">
            <Expand className="h-5 w-5" />
            <span className="ml-2 text-sm">Fullscreen</span>
          </Button>
        </div>
       )}
      <iframe
        ref={iframeRef}
        src={gameUrl}
        title={`Eaglercraft ${selectedVersionLabel}`}
        className="w-full h-full border-0 flex-grow"
        allowFullScreen={true} 
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        onLoad={() => {
          toast({ title: "Game Loaded", description: `Eaglercraft ${selectedVersionLabel} is ready. Click inside to play!` });
          if (iframeRef.current) {
            iframeRef.current.focus();
          }
        }}
      ></iframe>
    </div>
  );
};

export default GameClient;
