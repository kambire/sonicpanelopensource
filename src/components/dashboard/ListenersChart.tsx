
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "00:00", listeners: 45 },
  { time: "02:00", listeners: 30 },
  { time: "04:00", listeners: 20 },
  { time: "06:00", listeners: 27 },
  { time: "08:00", listeners: 42 },
  { time: "10:00", listeners: 85 },
  { time: "12:00", listeners: 78 },
  { time: "14:00", listeners: 86 },
  { time: "16:00", listeners: 94 },
  { time: "18:00", listeners: 108 },
  { time: "20:00", listeners: 117 },
  { time: "22:00", listeners: 89 },
];

const ListenersChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Listeners Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorListeners" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="listeners"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorListeners)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ListenersChart;
