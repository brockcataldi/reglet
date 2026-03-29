import { Navigate, useParams } from 'react-router';
import z from 'zod';

import TraditionalBreakpoint from '../components/TraditionalBreakpoint';
import {
	useSettingsType,
	useTraditionalBreakpointExists,
} from '../hooks/useProjectStore';

const IdSchema = z.uuid({ version: 'v4' });

const TraditionalRoute = () => {
	const { id } = useParams();
	const type = useSettingsType();
	const parsed = IdSchema.safeParse(id);
	const breakpointId = parsed.success ? parsed.data : undefined;
	const breakpointExists = useTraditionalBreakpointExists(breakpointId);

	if (type !== 'traditional') {
		return <Navigate to={'/fluid/min'} replace />;
	}

	if (!breakpointId) {
		return <Navigate to={'/traditional'} replace />;
	}

	if (!breakpointExists) {
		return <Navigate to={'/traditional'} replace />;
	}

	return <TraditionalBreakpoint id={breakpointId} />;
};
export default TraditionalRoute;
