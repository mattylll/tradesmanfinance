const fs = require('fs');
const path = require('path');

// Load counties data
const countiesData = JSON.parse(fs.readFileSync('./public/data/uk-counties-towns.json', 'utf8'));

// Helper function to create URL-safe slugs
function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Build a map of town -> county
const townToCountyMap = {};
for (const [countySlug, county] of Object.entries(countiesData.counties)) {
    for (const townName of county.towns) {
        const townSlug = slugify(townName);
        townToCountyMap[townSlug] = countySlug;
    }
}

console.log(`\n========================================`);
console.log(`MIGRATING TOWN PAGES INTO COUNTY FOLDERS`);
console.log(`========================================\n`);

const locationsDir = path.join(__dirname, 'trades', 'locations');
let moved = 0;
let skipped = 0;
let errors = [];

// Get all directories in locations
const dirs = fs.readdirSync(locationsDir).filter(f => {
    const stat = fs.statSync(path.join(locationsDir, f));
    return stat.isDirectory();
});

for (const dir of dirs) {
    // Skip if it's a county (has towns in our data)
    if (countiesData.counties[dir]) {
        console.log(`⊙ County: ${dir} (skipping)`);
        continue;
    }

    // Check if this is a town that should be moved
    const countySlug = townToCountyMap[dir];
    if (countySlug) {
        const sourcePath = path.join(locationsDir, dir);
        const targetPath = path.join(locationsDir, countySlug, dir);

        try {
            // Check if target already exists
            if (fs.existsSync(targetPath)) {
                console.log(`⊙ Skipped: ${dir} (already in ${countySlug})`);
                skipped++;
                continue;
            }

            // Create county folder if it doesn't exist
            const countyPath = path.join(locationsDir, countySlug);
            if (!fs.existsSync(countyPath)) {
                fs.mkdirSync(countyPath, { recursive: true });
            }

            // Move the town folder
            fs.renameSync(sourcePath, targetPath);

            // Update the HTML paths (add one more ../ level)
            const htmlPath = path.join(targetPath, 'index.html');
            if (fs.existsSync(htmlPath)) {
                let html = fs.readFileSync(htmlPath, 'utf8');

                // Update relative paths - add one more level
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/index\.html"/g, 'href="../../../../index.html"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/services\.html"/g, 'href="../../../../services.html"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/about\.html"/g, 'href="../../../../about.html"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/contact\.html"/g, 'href="../../../../contact.html"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/trades\/"/g, 'href="../../../../trades/"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/blog\/"/g, 'href="../../../../blog/"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/privacy-policy\.html"/g, 'href="../../../../privacy-policy.html"');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/accessibility-statement\.html"/g, 'href="../../../../accessibility-statement.html"');
                html = html.replace(/src="\.\.\/\.\.\/\.\.\/public\//g, 'src="../../../../public/');
                html = html.replace(/href="\.\.\/\.\.\/\.\.\/public\//g, 'href="../../../../public/');

                // Update breadcrumb link to locations hub
                html = html.replace(/href="\.\.\/index\.html"/g, 'href="../../index.html"');

                // Update links to other towns in same county (they're now siblings, not ../town/)
                // Change ../townslug/ to ../townslug/ (stays the same since they're in same county now)
                // But we need to fix the county link in breadcrumb
                html = html.replace(/href="\.\.\/[a-z-]+\/"/g, (match) => {
                    // Keep as is - towns are now siblings
                    return match;
                });

                fs.writeFileSync(htmlPath, html, 'utf8');
            }

            console.log(`✓ Moved: ${dir} → ${countySlug}/${dir}`);
            moved++;
        } catch (error) {
            errors.push({ town: dir, error: error.message });
            console.error(`✗ Error moving ${dir}:`, error.message);
        }
    } else {
        console.log(`? Unknown: ${dir} (not in any county)`);
    }
}

console.log(`\n========================================`);
console.log(`MIGRATION COMPLETE`);
console.log(`========================================`);
console.log(`Moved: ${moved} town folders`);
console.log(`Skipped: ${skipped} (already in place)`);
if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`);
    errors.forEach(e => console.log(`  - ${e.town}: ${e.error}`));
}
console.log(`========================================\n`);
