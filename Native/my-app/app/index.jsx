import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const RootLayout = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<StatusBar style="auto" />
			<Text className="text-3xl">Root Layout</Text>
			<Link href="/profile" className="text-blue-500 underline-offset-1 underline">Goto profile</Link>
		</View>
	);
};

export default RootLayout;
