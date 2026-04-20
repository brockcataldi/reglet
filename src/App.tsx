import { BrowserRouter, Route, Routes } from 'react-router';

import IndexRoute from './routes/IndexRoute';
import NewRoute from './routes/NewRoute';
import BreakpointIndexRoute from './routes/BreakpointIndexRoute';
import BreakpointRoute from './routes/BreakpointRoute';
import BreakpointsRoute from './routes/BreakpointsRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<IndexRoute />} />
				<Route path="new" element={<NewRoute />} />
				<Route path="breakpoints" element={<BreakpointsRoute />} />
				<Route path="breakpoint">
					<Route index element={<BreakpointIndexRoute />} />
					<Route path=":id" element={<BreakpointRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
