import { Navigate } from 'react-router';
import { getFirstBreakpointId } from '@/project/selectors';

const BreakpointIndexRoute = () => {
	const first = getFirstBreakpointId();

	if (!first) {
		return <h1>Something interesting happened...</h1>;
	}

	return <Navigate to={first} replace />;
};

export default BreakpointIndexRoute;
