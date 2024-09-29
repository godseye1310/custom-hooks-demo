import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetch from "./hooks/useFetch";

function App() {
	const [tasks, setTasks] = useState([]);

	// Transform the data from Firebase structure to an array of tasks
	const transformData = useCallback((resdata) => {
		const loadedTasks = [];
		console.log(resdata);
		for (const taskKey in resdata) {
			loadedTasks.push({ id: taskKey, text: resdata[taskKey].text });
		}
		return loadedTasks;
	}, []);

	// Use the useFetch hook for GET request with the transform function
	const { isLoading, sendRequest, data, error } = useFetch(
		"https://react-api-http-requests-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
		"GET",
		transformData
	);

	// Update state when tasks are fetched
	useEffect(() => {
		if (data) {
			setTasks(data);
		}
	}, [data]);

	// Manual fetch trigger (optional)
	const fetchTasks = () => {
		sendRequest();
	};

	// Handle new task addition after POST request
	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
