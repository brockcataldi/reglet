import { Navigate, useParams } from 'react-router';

import { useBreakpointExists } from '../project/slices/breakpoint';

import TraditionalBreakpoint from '../components/TraditionalBreakpoint';

const BreakpointRoute = () => {
	const { id } = useParams();
	const _id = id === undefined ? id : parseInt(id);
	const breakpointExists = useBreakpointExists(_id);

	if (!_id || !breakpointExists) {
		return <Navigate to={'/breakpoint'} replace />;
	}

	return <TraditionalBreakpoint id={_id} />;
};
export default BreakpointRoute;
