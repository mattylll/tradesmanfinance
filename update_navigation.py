#!/usr/bin/env python3
import os
import re
from pathlib import Path

def get_relative_path_to_blog(file_path):
    """Calculate the relative path from a file to the blog directory."""
    file_path = Path(file_path)
    depth = len(file_path.parts) - len(Path('/Users/mattlenzie/Documents/TradesmanFinance.co.uk Website').parts) - 1
    
    if depth == 0:  # Root level
        return "/blog/"
    elif depth == 1:  # One level deep (e.g., /trades/)
        return "../blog/"
    elif depth == 2:  # Two levels deep (e.g., /trades/locations/)
        return "../../blog/"
    elif depth == 3:  # Three levels deep (e.g., /trades/locations/birmingham/)
        return "../../../blog/"
    else:
        return "../" * depth + "blog/"

def update_navigation(file_path):
    """Update navigation in HTML file."""
    blog_path = get_relative_path_to_blog(file_path)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if Guides dropdown already exists
    if 'Guides Dropdown' in content or '<a href="/blog/">Guides</a>' in content:
        print(f"  Skipping {file_path} - Already has Guides dropdown")
        return False
    
    # Create the Guides dropdown HTML with appropriate paths
    guides_dropdown = f'''                    </li>

                    <!-- Guides Dropdown -->
                    <li class="has-dropdown">
                        <a href="{blog_path}">Guides</a>
                        <div class="dropdown-menu">
                            <div class="dropdown-section">
                                <h3>Equipment Guides</h3>
                                <div class="dropdown-links">
                                    <a href="{blog_path}scaffolding-materials-finance-guide.html">Scaffolding Materials Finance</a>
                                    <a href="{blog_path}woodworking-equipment-finance-options.html">Woodworking Equipment Finance</a>
                                    <a href="{blog_path}metalwork-equipment-financing.html">Metalwork Equipment Financing</a>
                                </div>
                            </div>
                            <div class="dropdown-section">
                                <h3>Trade Finance Guides</h3>
                                <div class="dropdown-links">
                                    <a href="{blog_path}bathroom-fitting-finance-explained.html">Bathroom Fitting Finance</a>
                                    <a href="{blog_path}home-tradesman-equipment-loans.html">Home Tradesman Startup Finance</a>
                                    <a href="{blog_path}">View All Guides →</a>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile submenu -->
                        <div class="mobile-submenu">
                            <a href="{blog_path}scaffolding-materials-finance-guide.html">Scaffolding Finance</a>
                            <a href="{blog_path}woodworking-equipment-finance-options.html">Woodworking Equipment</a>
                            <a href="{blog_path}bathroom-fitting-finance-explained.html">Bathroom Fitting</a>
                            <a href="{blog_path}">View All Guides →</a>
                        </div>
                    </li>'''
    
    # Pattern to find where to insert - after Locations dropdown, before Equipment or About
    # Look for the closing of Locations dropdown
    patterns = [
        # Pattern 1: After Locations, before Equipment
        (r'(<!-- Locations Dropdown -->.*?</li>)\s*(\n\s*<!-- Equipment Dropdown -->)', 
         r'\1' + guides_dropdown + r'\2'),
        # Pattern 2: After Locations, before About (if no Equipment)
        (r'(<!-- Locations Dropdown -->.*?</li>)\s*(\n\s*<li><a href="[^"]*about[^"]*">About</a></li>)',
         r'\1' + guides_dropdown + r'\2'),
        # Pattern 3: Generic pattern after any Locations dropdown structure
        (r'(<a href="[^"]*locations[^"]*">Locations</a>.*?</div>\s*</li>)\s*(\n)',
         r'\1' + guides_dropdown + r'\2')
    ]
    
    header_updated = False
    for pattern, replacement in patterns:
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
            header_updated = True
            break
    
    if not header_updated:
        print(f"  Warning: Could not update header in {file_path}")
    
    # Update footer - add Guides & Resources section
    footer_section = f'''                    <div class="footer-links-section">
                        <h3>GUIDES & RESOURCES</h3>
                        <ul role="list">
                            <li><a href="{blog_path}">Equipment Finance Guides</a></li>
                            <li><a href="{blog_path}scaffolding-materials-finance-guide.html">Scaffolding Finance</a></li>
                            <li><a href="{blog_path}woodworking-equipment-finance-options.html">Woodworking Equipment</a></li>
                            <li><a href="{blog_path}bathroom-fitting-finance-explained.html">Bathroom Fitting</a></li>
                        </ul>
                    </div>

                    <div class="footer-trust">'''
    
    # Check if footer already has Guides section
    if 'GUIDES & RESOURCES' not in content:
        # Insert before WHY TRUST US section if it exists, or before the last footer section
        footer_patterns = [
            (r'(\s*<div class="footer-trust">\s*<h3>WHY TRUST US</h3>)',
             footer_section.replace('<div class="footer-trust">', '') + r'\1'),
            (r'(</div>\s*</div>\s*</div>\s*<div class="footer-bottom">)',
             footer_section.replace('<div class="footer-trust">', '</div>') + r'\1')
        ]
        
        footer_updated = False
        for pattern, replacement in footer_patterns:
            if re.search(pattern, content, re.DOTALL):
                content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
                footer_updated = True
                break
        
        if not footer_updated:
            print(f"  Warning: Could not update footer in {file_path}")
    
    # Write the updated content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return header_updated or footer_updated

def main():
    """Main function to update all HTML files."""
    root_dir = Path('/Users/mattlenzie/Documents/TradesmanFinance.co.uk Website')
    
    # Get all HTML files
    html_files = list(root_dir.rglob('*.html'))
    
    # Exclude certain files/directories
    exclude_patterns = [
        'node_modules', 'backend', 'deploy_clean', '.claude',
        'index-v2.html', 'index-v3.html', 'index-v4.html', 
        'index-enhanced.html', 'index-final.html', 'index-new.html',
        'index-seo.html', 'test-versions.html', 'compare-designs.html',
        'debug-dashboard.html', 'preview-industrial.html',
        'birmingham/plumber-finance.html.tmp'
    ]
    
    filtered_files = []
    for file_path in html_files:
        skip = False
        for pattern in exclude_patterns:
            if pattern in str(file_path):
                skip = True
                break
        if not skip:
            filtered_files.append(file_path)
    
    # Group files by directory for better organization
    files_by_dir = {}
    for file_path in filtered_files:
        dir_path = file_path.parent
        if dir_path not in files_by_dir:
            files_by_dir[dir_path] = []
        files_by_dir[dir_path].append(file_path)
    
    print(f"Found {len(filtered_files)} HTML files to process")
    print("-" * 60)
    
    updated_count = 0
    for dir_path in sorted(files_by_dir.keys()):
        files = files_by_dir[dir_path]
        rel_dir = dir_path.relative_to(root_dir) if dir_path != root_dir else Path('.')
        print(f"\nDirectory: {rel_dir}")
        for file_path in sorted(files):
            if 'index.html' in str(file_path) and str(file_path).endswith('Website/index.html'):
                print(f"  Skipping {file_path.name} - Already updated manually")
                continue
            if update_navigation(file_path):
                print(f"  Updated: {file_path.name}")
                updated_count += 1
    
    print("\n" + "=" * 60)
    print(f"Summary: Updated {updated_count} files")
    
    # Sample some files to verify paths
    print("\nPath Verification Samples:")
    sample_files = [
        root_dir / 'about.html',
        root_dir / 'trades' / 'electrician-finance.html',
        root_dir / 'trades' / 'locations' / 'index.html',
        root_dir / 'trades' / 'locations' / 'birmingham' / 'index.html'
    ]
    
    for file_path in sample_files:
        if file_path.exists():
            blog_path = get_relative_path_to_blog(file_path)
            rel_path = file_path.relative_to(root_dir)
            print(f"  {rel_path}: blog path = {blog_path}")

if __name__ == "__main__":
    main()
