import { Stack } from "expo-router";

export default function App() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					headerShown: true,
				}}
			/>
		</Stack>
	);
}
