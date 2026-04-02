import { Navigate } from 'react-router';
import { useFirstBreakpointId } from '../project/slices/breakpoint';

const BreakpointIndexRoute = () => {
	const first = useFirstBreakpointId();

	if (!first) {
		return <h1>Something interesting happened...</h1>;
	}

	return <Navigate to={first} replace />;
};

export default BreakpointIndexRoute;
