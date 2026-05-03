import Canvas from "@/components/reglet/canvas/Canvas";

import Aside from "./Aside";
import Header from "./Header";

type EditorProps = {
	id: string;
};

const Editor = ({ id }: EditorProps) => {
	return (
		<div>
			<Header id={id} />
			<Aside id={id} />
			<main className="mt-10 ml-64 p-4">
				<Canvas id={id} />
			</main>
		</div>
	);
};

export default Editor;
