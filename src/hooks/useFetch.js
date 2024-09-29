import { useCallback, useEffect, useState } from "react";

const useFetch = (url, method = "GET", transformData = null) => {
	const [data, setData] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (body = null) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(url, {
					method: method,
					body: body ? JSON.stringify(body) : null,
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Request failed!");
				}
				const resData = await response.json();

				const finalData = transformData
					? transformData(resData)
					: resData;
				setData(finalData);

				return resData;
			} catch (err) {
				setError(err.message || "Something went wrong!");
			} finally {
				setIsLoading(false);
			}
		},
		[method, url, transformData]
	);

	useEffect(() => {
		if (method === "GET") {
			sendRequest();
		}
	}, [sendRequest, method]);

	return { sendRequest, isLoading, data, error };
};

export default useFetch;
