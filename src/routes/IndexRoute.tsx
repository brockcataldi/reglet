import { Container } from '@radix-ui/themes';
import { Link } from 'react-router';

const IndexRoute = () => {
	return (
		<Container>
			<Link to={'/new'}>Breakpoint</Link>
		</Container>
	);
};

export default IndexRoute;
