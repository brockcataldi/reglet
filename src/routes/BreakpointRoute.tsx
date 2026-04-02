import { Navigate, useParams } from 'react-router';

import { useSettingsType } from '../project/slices/settings';
import { useBreakpointExists } from '../project/slices/breakpoint';

import TraditionalBreakpoint from '../components/TraditionalBreakpoint';

const BreakpointRoute = () => {
	const { id } = useParams();
	const type = useSettingsType();
	const breakpointExists = useBreakpointExists(id);

	if (!id || !breakpointExists) {
		return <Navigate to={'/breakpoint'} replace />;
	}

	if (type === 'fluid') {
		return <h1>Fluid Breakpoint</h1>;
	}

	return <TraditionalBreakpoint id={id} />;
};
export default BreakpointRoute;
