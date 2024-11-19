import { Icon } from "@/components/icon";

export function Footer() {
	return (
		<footer className="w-full bg-gray-100 rounded-t-[2rem]">
			<div className="w-full max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
				<div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-8 text-center">
					<p className="text-sm">
						Build by{" "}
						<a
							className="underline"
							href="https://mikeliuu.com"
							target="_blank"
							rel="noopener"
						>
							Mike Liu (@mikeliuu)
						</a>
					</p>

					<p className="text-sm flex justify-center items-end gap-2">
						Code on{" "}
						<a
							className="flex justify-center items-end underline"
							href="https://github.com/mikeliuu/recipe-generator"
							target="_blank"
							rel="noopener"
						>
							<Icon name="Github" /> Github
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
