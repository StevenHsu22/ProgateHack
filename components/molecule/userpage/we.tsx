





import * as React from "react";

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  trend,
  description
}) => {
  const trendColor = trend === "up" ? "text-teal-500" : "text-rose-500";
  const percentageColor = trend === "up" ? "rgba(0,182,155,1)" : "rgba(249,60,101,1)";

  return (
    <article className="flex flex-col grow items-start py-4 pr-8 pl-4 w-full text-base font-semibold bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] text-neutral-800 max-md:pr-5 max-md:mt-8">
      <h3 className="bg-blend-normal">
        {title}
      </h3>
      <p className="mt-4 text-3xl font-bold tracking-wider">
        {value}
      </p>
      <div className={`self-end mt-8 ${trendColor}`}>
        <span style={{ color: percentageColor }}>{percentage}</span>{" "}
        <span style={{ color: "rgba(96,96,96,1)" }}>
          {description}
        </span>
      </div>
    </article>
  );
};

export default StatCard;


