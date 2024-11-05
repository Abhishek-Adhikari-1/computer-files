import {
	AnnouncementIcon,
	AssignmentIcon,
	AttendanceIcon,
	ClassIcon,
	HouseIcon,
	TeacherIcon,
	StudentIcon,
	ParentIcon,
	SubjectIcon,
	LessonIcon,
	ExamIcon,
	ResultIcon,
	CalanderIcon,
	MessageIcon,
	ProfileIcon,
	SettingIcon,
	LogoutIcon,
} from "./Icons";
import { role } from "@/lib/data";
import MenuLink from "./MenuLink";

const menuItems = [
	{
		title: "MENU",
		items: [
			{
				icon: <HouseIcon />,
				label: "Home",
				href: "/admin",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <TeacherIcon />,
				label: "Teachers",
				href: "/dashboard/teachers",
				visible: ["admin", "teacher"],
			},
			{
				icon: <StudentIcon />,
				label: "Students",
				href: "/dashboard/students",
				visible: ["admin", "teacher"],
			},
			{
				icon: <ParentIcon />,
				label: "Parents",
				href: "/dashboard/parents",
				visible: ["admin", "teacher"],
			},
			{
				icon: <SubjectIcon />,
				label: "Subjects",
				href: "/dashboard/subjects",
				visible: ["admin"],
			},
			{
				icon: <ClassIcon />,
				label: "Classes",
				href: "/dashboard/classes",
				visible: ["admin", "teacher"],
			},
			{
				icon: <LessonIcon />,
				label: "Lessons",
				href: "/dashboard/lessons",
				visible: ["admin", "teacher"],
			},
			{
				icon: <ExamIcon />,
				label: "Exams",
				href: "/dashboard/exams",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <AssignmentIcon />,
				label: "Assignments",
				href: "/dashboard/assignments",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <ResultIcon />,
				label: "Results",
				href: "/dashboard/results",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <AttendanceIcon />,
				label: "Attendance",
				href: "/dashboard/attendance",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <CalanderIcon />,
				label: "Events",
				href: "/dashboard/events",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <MessageIcon />,
				label: "Messages",
				href: "/dashboard/messages",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <AnnouncementIcon />,
				label: "Announcements",
				href: "/dashboard/announcements",
				visible: ["admin", "teacher", "student", "parent"],
			},
		],
	},
	{
		title: "OTHER",
		items: [
			{
				icon: <ProfileIcon />,
				label: "Profile",
				href: "/profile",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <SettingIcon />,
				label: "Settings",
				href: "/settings",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: <LogoutIcon />,
				label: "Logout",
				href: "/logout",
				visible: ["admin", "teacher", "student", "parent"],
			},
		],
	},
];

const Menu = () => {
	return (
		<div className="px-2 pb-4">
			{menuItems?.map((item) => {
				return (
					<div key={item?.title} className="relative">
						<h3 className="uppercase hidden lg:block text-gray-400 font-light mt-4 mb-2 pb-1 sticky top-10 border-b-[1.5px] bg-background">
							{item?.title}
						</h3>

						{item?.items.map((subItem) => {
							if (subItem.visible.includes(role)) {
								return (
									<MenuLink
										key={subItem?.label}
										subItem={subItem}
									/>
								);
							}
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Menu;
