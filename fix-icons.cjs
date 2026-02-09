// // fix-icons.js
// const fs = require('fs');
// const path = require('path');

// const filesToUpdate = [
//   'src/pages/Cart.tsx',
//   'src/pages/Home.tsx',
//   'src/pages/ProductDetail.tsx',
//   'src/pages/Products.tsx',
//   'src/pages/Checkout.tsx',
//   'src/pages/Login.tsx',
//   'src/pages/Register.tsx',
//   'src/pages/OrderSuccess.tsx',
//   'src/components/layout/Navbar.tsx',
//   'src/components/layout/Footer.tsx',
// ];

// // Update each file to use the centralized icons
// filesToUpdate.forEach(file => {
//   const filePath = path.join(__dirname, file);
//   if (fs.existsSync(filePath)) {
//     let content = fs.readFileSync(filePath, 'utf8');
    
//     // Replace react-icons/fi imports with utils/icons
//     content = content.replace(
//       /import\s*{([^}]*)}\s*from\s*['"]react-icons\/fi['"]/g,
//       'import {$1} from \'../utils/icons\''
//     );
    
//     fs.writeFileSync(filePath, content, 'utf8');
//     console.log(`Updated: ${file}`);
//   }
// });

// console.log('All icon imports updated!');