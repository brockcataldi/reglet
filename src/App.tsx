import { BrowserRouter, Route, Routes } from 'react-router';

import IndexRoute from './routes/IndexRoute';
import NewRoute from './routes/NewRoute';
import BreakpointIndexRoute from './routes/BreakpointIndexRoute';
import BreakpointRoute from './routes/BreakpointRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<IndexRoute />} />
				<Route path="new" element={<NewRoute />} />
				<Route path="breakpoint">
					<Route index element={<BreakpointIndexRoute />} />
					<Route path=":id" element={<BreakpointRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
