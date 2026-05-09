import Canvas from "@/components/reglet/canvas/Canvas";
import Aside from "./Aside";

type EditorProps = {
	id: string;
};

const Editor = ({ id }: EditorProps) => {
	return (
		<div>
			<Aside id={id} />
			<Canvas id={id} />
		</div>
	);
};

export default Editor;
