import  { useState, useEffect } from 'react';

export const useFetch = (url, headers) => {
	const [data, setData] = useState({
		data: [],
		fetched: false,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const response = await fetch(url, headers);
				const data = await response.json();
				if (response.status === 200) {
					setData({ data, fetched: true });
					setLoading(false);
				} else {
					setData({ data, fetched: false });
					setLoading(false);
				}
			} catch (error) {
				console.log(error.message);
				setLoading(false);
				setData({ fetched: false });
				throw error;
			}
		};

		url && getData();
		//eslint-disable-next-line
	}, [url]);

	return { data, setData, loading, setLoading };
};
