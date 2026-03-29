import { Navigate } from 'react-router';

import {
	useSettingsType,
	useFirstTraditionalBreakpointId,
} from '../hooks/useProjectStore';

const TraditionalIndexRoute = () => {
	const type = useSettingsType();
	const first = useFirstTraditionalBreakpointId();

	if (type !== 'traditional') {
		return <Navigate to={'min'} replace />;
	}

	if (!first) {
		return <h1>Something interesting happened...</h1>;
	}

	return <Navigate to={first} replace />;
};

export default TraditionalIndexRoute;
