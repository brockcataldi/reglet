import { Navigate, useParams } from "react-router";

import { useBreakpointExists } from "@/store/hooks";

import Editor from "@/editor/Editor";

const BreakpointRoute = () => {
	const { id } = useParams();
	const exists = useBreakpointExists(id);

	if (id === undefined || !exists) {
		return <Navigate to="/breakpoint" replace />;
	}

	return <Editor key={id} id={id} />;
};

export default BreakpointRoute;
