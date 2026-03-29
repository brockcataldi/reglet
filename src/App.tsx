import { BrowserRouter, Route, Routes } from 'react-router';

import IndexRoute from './routes/IndexRoute';
import TraditionalIndexRoute from './routes/TraditionalIndexRoute';
import TraditionalRoute from './routes/TraditionalRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<IndexRoute />} />

				<Route path="traditional">
					<Route index element={<TraditionalIndexRoute />} />
					<Route path=":id" element={<TraditionalRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
