import Canvas from "@/components/reglet/canvas/Canvas";
import Aside from "./Aside";

type EditorProps = {
	id: string;
};

const Editor = ({ id }: EditorProps) => {
	return (
		<div>
			{/* <Header id={id} /> */}
			<Aside id={id} />
			<main className="ml-64 p-4">
				<Canvas id={id} />
			</main>
		</div>
	);
};

export default Editor;
