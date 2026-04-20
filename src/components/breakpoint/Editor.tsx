import { Box } from '@radix-ui/themes';

import Aside from './Aside';
import Header from './Header';

import Canvas from '@/components/breakpoint/canvas/Canvas';

type EditorProps = {
	id: string;
};

const Editor = ({ id }: EditorProps) => {
	return (
		<Box className="editor">
			<header className="editor__header">
				<Header id={id} />
			</header>
			<aside className="editor__aside">
				<Aside id={id} />
			</aside>
			<main className="editor__main">
				<Box p="2">
					<Canvas id={id} />
				</Box>
			</main>
		</Box>
	);
};

export default Editor;
