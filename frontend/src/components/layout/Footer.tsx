export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/40">
      <div className="container-narrow py-6 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} MISTLLC. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-200">Terms</a>
          <a href="#" className="hover:text-gray-200">Privacy</a>
          <a href="#" className="hover:text-gray-200">Support</a>
        </div>
      </div>
    </footer>
  );
}
