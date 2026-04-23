export function Footer(): JSX.Element {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-10 text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} 2bgamersstore. Built for elite gamers.
        </footer>
    );
}
