"use client";

import { EllipsisIcon, TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	ReferenceLine,
	XAxis,
	YAxis,
} from "recharts";

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

export const description = "A multiple bar chart";

const chartData = [
	{ day: "Sunday", present: 186, absent: 80 },
	{ day: "Monday", present: 305, absent: 200 },
	{ day: "Tuesday", present: 237, absent: 120 },
	{ day: "Wednesday", present: 73, absent: 190 },
	{ day: "Thrusday", present: 209, absent: 130 },
	{ day: "Friday", present: 214, absent: 140 },
];

const chartConfig = {
	present: {
		label: "Present",
		color: "hsl(var(--chart-1))",
	},
	absent: {
		label: "Absent",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

const AttendanceChart = () => {
	const totalPresent = chartData.reduce((sum, day) => sum + day.present, 0);
	const averagePresent = (totalPresent / chartData.length).toFixed(0);
	return (
		<div className="bg-card rounded-2xl">
			<CardHeader className="items-center p-4">
				<CardTitle className="flex w-full flex-row justify-between items-center">
					<span>Attendance Chart</span>
					<EllipsisIcon className="cursor-pointer text-card-foreground" />
				</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="relative">
				<ChartContainer config={chartConfig} className="h-full">
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: -30,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke="hsl(var(--border))"
						/>
						<XAxis
							dataKey="day"
							xAxisId={0}
							tickLine={false}
							tickMargin={3}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis />
						<ChartTooltip
							cursor={true}
							animationEasing="ease-in-out"
							defaultIndex={
								new Date().getDay() !== 6
									? new Date().getDay()
									: 0
							}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="present"
							fill="var(--color-present)"
							radius={4}
						/>
						<Bar
							dataKey="absent"
							fill="var(--color-absent)"
							radius={4}
						/>
						<ChartLegend
							content={<ChartLegendContent />}
							className="absolute left-[50%] -translate-x-[50%] p-0 m-0"
						/>
						<ReferenceLine
							y={averagePresent}
							stroke="hsl(var(--foreground))"
							strokeDasharray="5 5"
							strokeWidth={1}
						>
							<Label
								position="insideBottomLeft"
								value="Average Presents"
								offset={10}
								fill="hsl(var(--reference-line-data))"
							/>
							<Label
								position="insideTopLeft"
								value={`${averagePresent}`}
								className="text-lg"
								fill="hsl(var(--reference-line-data))"
								offset={10}
								startOffset={100}
							/>
						</ReferenceLine>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</div>
	);
};

export default AttendanceChart;
