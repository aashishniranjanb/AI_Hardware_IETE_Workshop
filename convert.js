const fs = require('fs');
let c = fs.readFileSync('src/main.jsx', 'utf8');
c = '"use client";\n' + c;
c = c.replace(/import \{ createRoot \} from 'react-dom\/client';/, '');
c = c.replace(/createRoot\(document\.getElementById\('root'\)\)\.render\(<App \/>\);/, 'export default function Page() { return <App />; }');
c = c.replace(/import '\.\/styles\.css';/, '');
fs.writeFileSync('app/page.jsx', c);
console.log('Done');
