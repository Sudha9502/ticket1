import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer
}
from "recharts";

export default function CategoryChart({
  data
}) {

  return (

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        />

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  );
}