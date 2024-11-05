"use client";
import { EllipsisIcon, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with a legend";

const chartData = [
	{ month: "January", boys: 186, girls: 80 },
	{ month: "February", boys: 305, girls: 200 },
	{ month: "March", boys: 237, girls: 120 },
	{ month: "April", boys: 73, girls: 190 },
	{ month: "May", boys: 209, girls: 130 },
	{ month: "June", boys: 214, girls: 140 },
];

const chartConfig = {
	boys: {
		label: "Boys",
		color: "hsl(var(--chart-1))",
	},
	girls: {
		label: "Girls",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const CountChart = () => {
	return (
		<div className="bg-card rounded-2xl">
			<CardHeader className="items-center p-4">
				<CardTitle className="flex w-full flex-row justify-between items-center">
					<span>Students Chart</span>
					<EllipsisIcon className="cursor-pointer text-card-foreground" />
				</CardTitle>
				<CardDescription className="flex justify-start">
					Showing total students for the last 6 months
				</CardDescription>
			</CardHeader>

			<CardContent className="p-0 pb-3">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[200px] "
				>
					<RadarChart
						data={chartData}
						margin={{
							top: -40,
							bottom: -20,
						}}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<PolarAngleAxis dataKey="month" />
						<PolarGrid stroke="hsl(var(--border))" />
						<Radar
							dataKey="boys"
							fill="var(--color-boys)"
							fillOpacity={0.6}
						/>
						<Radar dataKey="girls" fill="var(--color-girls)" />
						<ChartLegend
							className="mt-8"
							content={<ChartLegendContent />}
						/>
					</RadarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm pt-4">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					January - June 2024
				</div>
			</CardFooter>
		</div>
	);
};

export default CountChart;
