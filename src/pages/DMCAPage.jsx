
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

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

const DMCAPage = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow container mx-auto px-4 py-12 md:py-16"
    >
      <div className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-xl shadow-2xl border border-border">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-primary mb-6 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FileText className="h-8 w-8 mr-3" />
          DMCA & Copyright Policy
        </motion.h1>

        <div className="space-y-4 text-foreground">
          <p>
            This website (hereinafter referred to as "the Site") respects the intellectual property rights of others and expects its users to do the same. 
            It is our policy, in appropriate circumstances and at our discretion, to disable and/or terminate the access of users who repeatedly infringe or are repeatedly charged with infringing the copyrights or other intellectual property rights of others.
          </p>
          
          <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Notification of Copyright Infringement:</h2>
          <p>
            If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to our designated Copyright Agent.
          </p>
          <p>
            Upon receipt of the Notice as described below, the Site will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged material from the Site.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">DMCA Notice of Alleged Infringement ("Notice"):</h3>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
            <li>Identify the material that you claim is infringing (or to be the subject of infringing activity) and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material, including at a minimum, if applicable, the URL of the link shown on the Site where such material may be found.</li>
            <li>Provide your mailing address, telephone number, and, if available, email address.</li>
            <li>Include both of the following statements in the body of the Notice:
              <ul className="list-disc list-inside space-y-1 pl-6 mt-1">
                <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
              </ul>
            </li>
            <li>Provide your full legal name and your electronic or physical signature.</li>
          </ol>
          <p className="mt-4">
            Deliver this Notice, with all items completed, to the Site's designated Copyright Agent: <strong className="text-primary">Corget (corget8@gmail.com)</strong>. 
            Please note that this contact information is for DMCA notices only. For other inquiries, please refer to other contact methods if available.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Counter-Notification Procedures:</h2>
          <p>
            If you believe that material you posted on the site was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us (a "Counter-Notice") by submitting written notification to our copyright agent.
          </p>
          <p>
            Please consult with legal counsel before filing a Counter-Notice, as there can be penalties for false claims.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Disclaimer:</h2>
          <p>
            This website provides access to Eaglercraft, which is a fan-made project. We do not host any game files directly on our servers unless explicitly stated for specific offline versions. 
            The online play functionality typically embeds or links to third-party hosted instances of Eaglercraft. 
            We are not affiliated with Mojang AB or Microsoft. Minecraft is a trademark of Mojang AB.
          </p>
          <p>
            If you have concerns about specific content, please use the DMCA notification process outlined above.
          </p>
        </div>
      </div>
    </motion.main>
  );
};

export default DMCAPage;
