
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ServerStatusItemProps {
  label: string;
  value: number;
  max: number;
  unit: string;
}

const ServerStatusItem = ({ label, value, max, unit }: ServerStatusItemProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {value} {unit} / {max} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const ServerStatus = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Server Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ServerStatusItem label="CPU Usage" value={32} max={100} unit="%" />
        <ServerStatusItem label="Memory" value={3.2} max={8} unit="GB" />
        <ServerStatusItem label="Disk Space" value={45} max={100} unit="GB" />
        <ServerStatusItem label="Bandwidth" value={42} max={100} unit="Mbps" />
        
        <div className="flex items-center mt-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">All services operational</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerStatus;
