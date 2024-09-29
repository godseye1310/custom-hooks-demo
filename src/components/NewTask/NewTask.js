import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/useFetch";

const NewTask = (props) => {
	const { sendRequest, isLoading, error } = useFetch(
		"https://react-api-http-requests-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
		"POST"
	);
	const enterTaskHandler = async (taskText) => {
		const postTask = await sendRequest({ text: taskText });
		console.log(postTask);

		const generatedId = postTask.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };
		props.onAddTask(createdTask);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
