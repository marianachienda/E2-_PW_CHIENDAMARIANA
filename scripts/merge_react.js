
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "src");
const OUTPUT = path.join(ROOT, "merged_code_frontend.txt");

// Extensiones que se incluirán
const EXTENSIONS = [".js", ".jsx", ".css"];

let result = "";
let totalFiles = 0;

// Carpetas que se pueden excluir
const EXCLUDED_FOLDERS = [
    "node_modules",
    "dist",
    ".git"
];

function collectFiles(folder) {
    if (!fs.existsSync(folder)) {
        console.warn(`Carpeta no encontrada: ${folder}`);
        return;
    }

    const entries = fs.readdirSync(folder, {
        withFileTypes: true
    });

    // Ordenar alfabéticamente
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const entryPath = path.join(folder, entry.name);

        if (entry.isDirectory()) {

            if (EXCLUDED_FOLDERS.includes(entry.name)) {
                continue;
            }

            collectFiles(entryPath);

        } else if (
            entry.isFile() &&
            EXTENSIONS.includes(path.extname(entry.name).toLowerCase())
        ) {

            const content = fs.readFileSync(entryPath, "utf8");

            result += `
==================================================
ARCHIVO: ${path.relative(ROOT, entryPath)}
==================================================

${content}

`;

            totalFiles++;
            console.log(`Incluido: ${path.relative(ROOT, entryPath)}`);
        }
    }
}

// Iniciar recorrido desde src
collectFiles(SOURCE);

// Generar archivo final
fs.writeFileSync(OUTPUT, result, "utf8");

console.log("\n==========================================");
console.log(" MERGE DE REACT COMPLETADO CORRECTAMENTE");
console.log("==========================================");
console.log(`Archivos unidos: ${totalFiles}`);
console.log(`Archivo generado: ${OUTPUT}`);
console.log("==========================================");
