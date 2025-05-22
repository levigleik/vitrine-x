export function Footer() {
	return (
		<footer className="bg-gray-100 py-6 mt-auto">
			<div className="container mx-auto px-4">
				<nav aria-label="Links do rodapé">
					<ul className="flex justify-center items-center space-x-4">
						<li>
							<a
								href="https://github.com/levigleik/vitrine-x"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
								aria-label="Visite meu perfil no GitHub"
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								href="https://www.linkedin.com/in/levi-gleik/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
								aria-label="Conecte-se comigo no LinkedIn"
							>
								LinkedIn
							</a>
						</li>
						<li>
							<a
								href="https://levigleik.vercel.app"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900 transition-colors"
								aria-label="Visite meu portfólio"
							>
								Portfólio
							</a>
						</li>
					</ul>
				</nav>
				<p className="text-center text-gray-500 mt-4">
					© {new Date().getFullYear()} Vitrine X.
				</p>
			</div>
		</footer>
	);
}
