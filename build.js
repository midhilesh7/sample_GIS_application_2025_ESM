// const esbuild = require('esbuild');
// const fs = require('fs').promises;
// const path = require('path');

// const isProduction = process.argv.includes('--prod');
// const isClean = process.argv.includes('clean');

// async function clean() {
//   try {
//     await fs.rm(path.join(__dirname, 'dist'), { recursive: true, force: true });
//     console.log('dist folder removed');
//   } catch (error) {
//     if (error.code !== 'ENOENT') {
//       console.error('Failed to remove dist folder:', error);
//       process.exit(1);
//     }
//   }
// }

// async function build() {
//   try {
//     // Ensure dist/js and dist/css directories exist
//     await fs.mkdir(path.join(__dirname, 'dist/js'), { recursive: true });
//     await fs.mkdir(path.join(__dirname, 'dist/css'), { recursive: true });

//     // Run esbuild for JavaScript and CSS
//     await esbuild.build({
//       entryPoints: [
//         'public/js/mapview.js',
//         'public/js/featureLayer.js',
//         'public/css/styles.css',
//       ],
//       bundle: true,
//       outdir: 'dist', // Base output directory
//       outbase: 'public', // Preserve folder structure (js/, css/)
//       format: 'esm', // For JS files
//       minify: isProduction,
//       sourcemap: false,
//       external: ['https://js.arcgis.com/*'],
//       logLevel: 'info',
//     });

//     // Copy index.html to dist
//     await fs.copyFile('public/index.html', 'dist/index.html');
//     console.log('index.html copied to dist');
//     console.log('Build completed successfully');
//   } catch (error) {
//     console.error('Build failed:', error);
//     process.exit(1);
//   }
// }

// async function main() {
//   if (isClean) {
//     await clean();
//   } else {
//     await build();
//   }
// }

// main();

const esbuild = require('esbuild');
const fs = require('fs').promises;
const path = require('path');

const isProduction = process.argv.includes('--prod');
const isClean = process.argv.includes('clean');

async function clean() {
  try {
    await fs.rm(path.join(__dirname, 'dist'), { recursive: true, force: true });
    console.log('dist folder removed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to remove dist folder:', error);
      process.exit(1);
    }
  }
}

async function build() {
  try {
    await fs.mkdir(path.join(__dirname, 'dist/js'), { recursive: true });
    await fs.mkdir(path.join(__dirname, 'dist/css'), { recursive: true });

    await esbuild.build({
      entryPoints: [
        'public/js/mapview.js',
        'public/js/featureLayer.js',
        'public/css/styles.css',
      ],
      bundle: true,
      outdir: 'dist',
      outbase: 'public',
      format: 'esm',
      minify: isProduction,
      sourcemap: false,
      external: ['https://js.arcgis.com/*'], // ✅ Ensures ArcGIS CDN modules are not bundled
      logLevel: 'info',
    });

    await fs.copyFile('public/index.html', 'dist/index.html');
    console.log('index.html copied to dist');
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

async function main() {
  if (isClean) {
    await clean();
  } else {
    await build();
  }
}

main();
