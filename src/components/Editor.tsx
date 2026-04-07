import { Box } from '@radix-ui/themes';

import EditorAside from './EditorAside';
import EditorHeader from './EditorHeader';
import Canvas from './Canvas';

type EditorProps = {
	id: string;
};

const Editor = ({ id }: EditorProps) => {
	return (
		<Box>
			<header className="editor__header">
				<EditorHeader id={id} />
			</header>
			<aside className="editor__aside">
				<EditorAside id={id} />
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
