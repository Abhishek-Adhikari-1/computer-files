"use client";
import { EllipsisIcon, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const FinanceChart = () => {
	return (
		<div className="bg-card rounded-2xl w-full">
			<CardHeader>
				<CardTitle className="flex w-full flex-row justify-between items-center">
					<span>Finance Chart</span>
					<EllipsisIcon className="cursor-pointer text-card-foreground" />
				</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: -30,
						}}
					>
						<CartesianGrid
							strokeDasharray="5 5"
							vertical={false}
							stroke="hsl(var(--border))"
						/>
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis />
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent />}
						/>
						<Line
							dataKey="desktop"
							type="monotone"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={true}
						/>
						<Line
							dataKey="mobile"
							type="monotone"
							stroke="var(--color-mobile)"
							strokeWidth={2}
							dot={true}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month{" "}
							<TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							Showing total visitors for the last 6 months
						</div>
					</div>
				</div>
			</CardFooter>
		</div>
	);
};

export default FinanceChart;
