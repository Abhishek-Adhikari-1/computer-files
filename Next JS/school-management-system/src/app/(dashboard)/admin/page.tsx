import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
	return (
		<div className="p-2 md:px-4 flex gap-3 flex-col md:flex-row">
			{/* LEFT SIDE CONTENT */}
			<div className="w-full md:w-3/5 lg:w-2/3 flex flex-col gap-4">
				{/* USER INFORMATION CARDS */}
				<div className="flex gap-3 justify-between flex-wrap">
					<UserCard type="students" />
					<UserCard type="teachers" />
					<UserCard type="parents" />
					<UserCard type="staffs" />
				</div>

				{/* MIDDLE CHARTS */}
				<div className="flex gap-4 flex-col lg:flex-row">
					{/* TOTAL COUNT CHART */}
					<div className="w-full lg:1/3 h-full">
						<CountChart />
					</div>
					<div className="w-full lg:1/3 h-full">
						<AttendanceChart />
					</div>

					{/* ATTENDACNE CHART */}
				</div>

				{/* END CHARTS */}
				<div className="flex gap-4 flex-col lg:flex-row">
					<FinanceChart />
				</div>
			</div>

			{/* RIGHT SIDE CONTENT */}
			<div className="w-full md:w-2/5 lg:w-1/3 flex gap-4 flex-col">
				<EventCalendar />
				<Announcements />
			</div>
		</div>
	);
};

export default AdminPage;
