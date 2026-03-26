import Breakpoint from './components/Breakpoint';
import { ProjectProvider } from './hooks/ProjectProvider';

const App = () => {
	return (
		<ProjectProvider>
			<Breakpoint />
		</ProjectProvider>
	);
};

export default App;
