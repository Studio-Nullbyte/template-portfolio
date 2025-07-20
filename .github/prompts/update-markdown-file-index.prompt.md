---
mode: 'agent'
description: 'Create or update an index of all markdown files in the repository with organized navigation and summaries'
tools: ['changes', 'codebase', 'editFiles', 'search']
---

# Update Markdown File Index

Create or update a comprehensive index of all markdown files in the repository, providing organized navigation and summaries to help users find relevant documentation quickly.

## Primary Objective

Generate a well-organized index that catalogs all markdown files in the repository, making documentation easily discoverable and navigable for users, contributors, and maintainers.

## Analysis Phase

### Repository Scanning
1. **File Discovery**: Scan the entire repository for `.md` files
2. **Directory Structure**: Map the organizational structure of documentation
3. **File Categorization**: Group files by purpose and content type
4. **Content Analysis**: Read file headers and summaries to understand content
5. **Link Validation**: Check for broken internal and external links

### Content Assessment
1. **Documentation Types**: Identify different types of documentation (API, guides, tutorials, etc.)
2. **Target Audiences**: Determine intended audiences for each document
3. **Content Freshness**: Assess when files were last updated
4. **Content Quality**: Evaluate completeness and usefulness
5. **Redundancy Check**: Identify duplicate or overlapping content

## Index Structure

### Main Index Format

```markdown
# Documentation Index

> Comprehensive index of all documentation in this repository

Last updated: [Current Date]

## Quick Navigation

- [📚 User Documentation](#user-documentation)
- [🛠️ Developer Documentation](#developer-documentation)
- [📋 Project Management](#project-management)
- [🔧 Configuration](#configuration)
- [📊 Reference Materials](#reference-materials)
- [🚀 Getting Started](#getting-started)

## Documentation Categories

### 📚 User Documentation
Documents for end users of the project.

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [User Guide](./docs/user-guide.md) | Complete guide for using the application | 2024-01-15 |
| [FAQ](./docs/faq.md) | Frequently asked questions and answers | 2024-01-10 |
| [Tutorials](./docs/tutorials/) | Step-by-step tutorials for common tasks | 2024-01-12 |

### 🛠️ Developer Documentation
Technical documentation for developers and contributors.

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [API Reference](./docs/api-reference.md) | Complete API documentation | 2024-01-14 |
| [Architecture](./docs/architecture.md) | System architecture overview | 2024-01-08 |
| [Contributing](./CONTRIBUTING.md) | Guidelines for contributing to the project | 2024-01-05 |

### 📋 Project Management
Project organization and governance documents.

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [README](./README.md) | Main project overview and setup instructions | 2024-01-16 |
| [Changelog](./CHANGELOG.md) | Version history and release notes | 2024-01-15 |
| [Roadmap](./docs/roadmap.md) | Future development plans | 2024-01-10 |

### 🔧 Configuration
Setup and configuration documentation.

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [Installation](./docs/installation.md) | Detailed installation instructions | 2024-01-12 |
| [Configuration](./docs/configuration.md) | Configuration options and examples | 2024-01-11 |
| [Deployment](./docs/deployment.md) | Deployment guides and best practices | 2024-01-09 |

### 📊 Reference Materials
Reference documentation and specifications.

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [Glossary](./docs/glossary.md) | Terms and definitions | 2024-01-08 |
| [Specifications](./docs/specifications/) | Technical specifications | 2024-01-13 |
| [Examples](./examples/) | Code examples and samples | 2024-01-14 |

## Document Status Legend

| Status | Description |
|--------|-------------|
| 🟢 | Up to date and complete |
| 🟡 | Needs minor updates |
| 🔴 | Needs major revision |
| 📝 | Work in progress |
| 🚧 | Under construction |

## Contributing to Documentation

### Adding New Documentation
1. Create the markdown file in the appropriate directory
2. Follow the [documentation style guide](./docs/style-guide.md)
3. Update this index to include the new document
4. Submit a pull request with your changes

### Updating Existing Documentation
1. Make your changes to the existing file
2. Update the "Last Updated" date in this index
3. Consider updating related documents if needed
4. Submit a pull request with your changes

## Documentation Standards

### File Naming
- Use lowercase with hyphens for spaces (e.g., `user-guide.md`)
- Use descriptive names that indicate content
- Group related files in subdirectories

### Content Structure
- Start with a clear H1 title
- Include a brief description or summary
- Use consistent heading hierarchy
- Include table of contents for longer documents

### Linking
- Use relative paths for internal links
- Ensure all links are functional
- Link to related documentation when relevant
- Use descriptive link text

## Maintenance

This index is automatically updated when:
- New markdown files are added to the repository
- Existing files are modified or moved
- Files are deleted or renamed

Manual updates may be needed for:
- Category assignments
- Document descriptions
- Status indicators
- Special annotations
```

### Directory-Specific Indexes

For repositories with extensive documentation, create directory-specific indexes:

```markdown
# API Documentation Index

All API-related documentation files.

## Core API Documentation
- [API Overview](./api-overview.md) - High-level API introduction
- [Authentication](./authentication.md) - Authentication and authorization
- [Rate Limiting](./rate-limiting.md) - API rate limits and quotas

## Endpoint Documentation
- [Users API](./endpoints/users.md) - User management endpoints
- [Projects API](./endpoints/projects.md) - Project management endpoints
- [Files API](./endpoints/files.md) - File upload and management

## Examples and Guides
- [Quick Start](./quick-start.md) - Getting started with the API
- [SDKs](./sdks/) - Official software development kits
- [Postman Collection](./postman/) - API testing collection

## Reference
- [Error Codes](./error-codes.md) - Complete error code reference
- [Changelog](./api-changelog.md) - API version history
- [Migration Guides](./migrations/) - Version migration guides
```

## Automation Guidelines

### Automated Index Generation

```bash
# Example script to scan for markdown files
find . -name "*.md" -type f | while read file; do
    # Extract title from first H1
    title=$(grep -m 1 "^# " "$file" | sed 's/^# //')
    
    # Get last modified date
    modified=$(stat -c %y "$file" | cut -d' ' -f1)
    
    # Get relative path
    path=$(echo "$file" | sed 's|^\./||')
    
    echo "| [$title]($path) | Description | $modified |"
done
```

### Integration with CI/CD

```yaml
# GitHub Actions example
name: Update Documentation Index
on:
  push:
    paths:
      - '**/*.md'
  
jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Generate Index
        run: |
          # Run index generation script
          ./scripts/generate-docs-index.sh
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs-index.md
          git commit -m "Update documentation index" || exit 0
          git push
```

## Categories and Classification

### Documentation Types
- **User Guides**: End-user focused documentation
- **Developer Docs**: Technical implementation details
- **API Reference**: Endpoint and method documentation
- **Tutorials**: Step-by-step instructional content
- **Specifications**: Technical requirements and standards
- **Process Docs**: Workflows and procedures
- **Reference**: Quick lookup information

### Priority Levels
- **Critical**: Essential for basic usage
- **Important**: Needed for advanced usage
- **Supplementary**: Additional helpful information
- **Archive**: Historical or deprecated content

### Audience Targeting
- **Beginners**: New users or developers
- **Intermediate**: Users with some experience
- **Advanced**: Expert users and contributors
- **Maintainers**: Project maintainers and administrators

## Content Quality Metrics

### Completeness Indicators
- [ ] Has clear title and description
- [ ] Includes table of contents (for longer docs)
- [ ] Contains actionable information
- [ ] Has examples where appropriate
- [ ] Links to related documentation

### Freshness Tracking
- Last updated date
- Review schedule
- Content owner/maintainer
- Revision history

### Accessibility Checks
- [ ] Uses semantic heading structure
- [ ] Has descriptive link text
- [ ] Includes alt text for images
- [ ] Maintains good reading flow
- [ ] Uses plain language principles

## Output Requirements

The index should include:
1. **Complete file listing**: All markdown files in the repository
2. **Organized categories**: Logical grouping of related documents
3. **Useful descriptions**: Brief but informative summaries
4. **Navigation aids**: Quick links and table of contents
5. **Status indicators**: Document freshness and quality status
6. **Maintenance info**: Last updated dates and ownership
7. **Contributing guidelines**: How to add or update documentation

## Validation Checklist

- [ ] All markdown files are included
- [ ] Categories are logical and complete
- [ ] All links are functional
- [ ] Descriptions are accurate and helpful
- [ ] Last updated dates are current
- [ ] Navigation structure is intuitive
- [ ] Status indicators are meaningful
- [ ] Contributing instructions are clear
