import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.resolve(__dirname, '../src/i18n/locales');

const namespaces = ['common', 'home', 'work', 'about', 'contact', 'case', 'validation'];
let hasErrors = false;

console.log('🔍 Checking i18n key parity between [en] and [pt-BR]...\n');

for (const ns of namespaces) {
  const enFile = path.join(localesDir, 'en', `${ns}.json`);
  const ptFile = path.join(localesDir, 'pt-BR', `${ns}.json`);

  if (!fs.existsSync(enFile)) {
    console.error(`❌ Missing English locale file: ${enFile}`);
    hasErrors = true;
    continue;
  }

  if (!fs.existsSync(ptFile)) {
    console.error(`❌ Missing Portuguese locale file: ${ptFile}`);
    hasErrors = true;
    continue;
  }

  try {
    const enContent = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    const ptContent = JSON.parse(fs.readFileSync(ptFile, 'utf8'));

    const enKeys = Object.keys(enContent).sort();
    const ptKeys = Object.keys(ptContent).sort();

    const missingInPt = enKeys.filter((k) => !ptKeys.includes(k));
    const missingInEn = ptKeys.filter((k) => !enKeys.includes(k));

    if (missingInPt.length > 0) {
      console.error(`❌ Namespace "${ns}": Missing in pt-BR:`, missingInPt);
      hasErrors = true;
    }

    if (missingInEn.length > 0) {
      console.error(`❌ Namespace "${ns}": Missing in en:`, missingInEn);
      hasErrors = true;
    }

    if (missingInPt.length === 0 && missingInEn.length === 0) {
      console.log(`✅ Namespace "${ns}": ${enKeys.length} keys verified.`);
    }
  } catch (err) {
    console.error(`❌ Error parsing JSON for namespace "${ns}":`, err.message);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n🚨 i18n parity check FAILED! All static keys must match between en and pt-BR.\n');
  process.exit(1);
} else {
  console.log('\n🎉 All i18n keys are 100% synchronized!\n');
  process.exit(0);
}
