import { Link } from 'react-router';

const IndexRoute = () => {
	return (
		<div>
			<h1>Index Route</h1>
			<Link to={'/traditional'}>New Project</Link>
		</div>
	);
};

export default IndexRoute;
