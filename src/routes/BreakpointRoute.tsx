import { Navigate, useParams } from 'react-router';

import { useBreakpointExists } from '../project/slices/breakpoint';

import Editor from '../components/Editor';

const BreakpointRoute = () => {
	const { id } = useParams();
	const exists = useBreakpointExists(id);

	if (id === undefined || !exists) {
		return <Navigate to={'/breakpoint'} replace />;
	}

	return <Editor id={id} />;
};
export default BreakpointRoute;
