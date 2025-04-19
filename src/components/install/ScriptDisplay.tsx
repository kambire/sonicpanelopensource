
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Download } from "lucide-react";
import { installScript } from "@/lib/install-script";

interface ScriptDisplayProps {
  onCopy: () => void;
  copied: boolean;
}

const ScriptDisplay = ({ onCopy, copied }: ScriptDisplayProps) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute right-4 top-4 z-10">
          <Button variant="ghost" size="icon" onClick={onCopy}>
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <div className="bg-black rounded-md p-4 text-white font-mono text-sm overflow-auto max-h-96">
          <pre className="whitespace-pre-wrap">
            {installScript}
          </pre>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Script
        </Button>
      </div>
    </div>
  );
};

export default ScriptDisplay;
