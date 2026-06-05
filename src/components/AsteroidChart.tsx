"use client";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  LogarithmicScale,
} from "chart.js";
import { NearEarthObject } from "@/lib/schemas/asteroids";
import { round } from "@/lib/utils";

// Обязательная регистрация модулей Chart.js для работы в React
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Tooltip,
  Legend,
);

export const AsteroidChart = ({
  asteroids,
}: {
  asteroids: NearEarthObject[];
}) => {
  const points: { x: number; y: number }[] = [];
  const colors: string[] = [];

  asteroids.forEach((asteroid) => {
    points.push({
      x: round(asteroid.close_approach_data[0]?.miss_distance.kilometers),
      y: round(asteroid.estimated_diameter.meters.estimated_diameter_max),
    });

    colors.push(
      asteroid.is_potentially_hazardous_asteroid
        ? "rgba(239, 68, 68, 0.7)"
        : "rgba(34, 197, 94, 0.7)",
    );
  });

  const data: ChartData<"scatter"> = {
    datasets: [
      {
        label: "Asteroids",
        data: points,
        backgroundColor: colors,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X (Distance, km)",
          color: "#fff",
          font: { size: 14, weight: "bold" },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      y: {
        type: "linear",
        // type: "logarithmic",
        title: {
          display: true,
          text: "Y (Max diameter, km)",
          color: "#fff",
          font: { size: 14, weight: "bold" },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
  };

  return (
    <div className="w-full h-1/2 ">
      <Scatter data={data} options={options} />
    </div>
  );
};
