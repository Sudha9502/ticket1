import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#1976d2",
  "#ff9800",
  "#4caf50"
];

export default function TicketCharts({
  stats
}) {

  const pieData = [
    {
      name: "Open",
      value: stats.open
    },
    {
      name: "In Progress",
      value: stats.inProgress
    },
    {
      name: "Resolved",
      value: stats.resolved
    }
  ];

  return (

    <ResponsiveContainer
      width="100%"
      height={400}
    >

      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label
        >

          {
            pieData.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />

              )
            )
          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  );
}