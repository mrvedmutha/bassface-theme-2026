# Claude Code Configuration for Bassface Theme 2026

This directory contains Claude Code configuration, context files, and skills for Shopify theme development with Figma integration.

## Directory Structure

```
.claude/
├── config.json                    # Claude Code configuration
├── context/                       # Context files loaded on startup
│   ├── shopify-theme.md          # Shopify theme architecture guide
│   ├── workflow.md               # Figma-to-Shopify workflow
│   └── design-system.md          # Design tokens documentation
├── skills/                        # Custom skills for development workflow
│   ├── analyze-figma.skill.md    # Analyze Figma designs
│   ├── build-component.skill.md  # Build components from Figma
│   ├── review-implementation.skill.md  # Review against Figma
│   └── sync-tokens.skill.md      # Sync design tokens
└── README.md                      # This file
```

## Configuration

### config.json

- **mcpServers**: MCP server configurations (Figma MCP configured separately)
- **settings**: Claude Code behavior settings
- **contextFiles**: Files loaded automatically for context
- **rules**: Project-specific development rules

## Context Files

### shopify-theme.md

Complete reference for Shopify theme development:

- Theme structure and directories
- File organization
- Liquid template best practices
- Section/block architecture
- Performance considerations

### workflow.md

Figma-to-Shopify development workflow:

- Phase 1: Design Analysis & Discovery
- Phase 2: Development
- Communication protocols
- Best practices for both phases

### design-system.md

Design system and token management:

- CSS variable categories
- Token naming conventions
- Usage guidelines
- Maintenance procedures

## Skills

### /analyze-figma

**Purpose**: Analyze Figma designs and extract implementation requirements

**Usage**: `/analyze-figma [figma-url-or-node-id]`

**Output**:

- Design system tokens
- Component breakdown
- Layout analysis
- Implementation recommendations
- Questions and clarifications

### /build-component

**Purpose**: Build Shopify sections or snippets from Figma specifications

**Usage**: `/build-component [component-name]`

**Features**:

- Creates sections with proper schema
- Creates reusable snippets
- Implements responsive design
- Ensures accessibility
- Matches Figma pixel-perfect

### /review-implementation

**Purpose**: Review implemented components against Figma designs

**Usage**: `/review-implementation [component-name]`

**Checks**:

- Visual accuracy
- Responsive behavior
- Accessibility compliance
- Code quality
- Shopify integration

### /sync-tokens

**Purpose**: Sync design tokens from Figma to CSS variables

**Usage**: `/sync-tokens`

**Actions**:

- Extracts tokens from Figma
- Updates `snippets/css-variables.liquid`
- Documents in `design-system.md`

## Development Workflow

### 1. Design Discovery Phase

```bash
# Analyze Figma design
/analyze-figma https://figma.com/file/...

# Review analysis and ask questions
# Extract design tokens if needed
/sync-tokens
```

### 2. Component Development Phase

```bash
# Build individual components
/build-component hero-section
/build-component product-card

# Review implementation
/review-implementation hero-section
```

### 3. Iterative Refinement

```bash
# Make adjustments based on review
# Re-review until approved
/review-implementation hero-section
```

## Figma MCP Integration

The Figma MCP server is configured separately in your local environment.

**Expected Capabilities**:

- Read Figma file structure
- Extract component properties
- Get design tokens (colors, typography, spacing)
- Access text content and hierarchy
- Read style definitions

## Best Practices

### Using Skills

- Run `/analyze-figma` at the start of each new feature
- Use `/build-component` for systematic component creation
- Always run `/review-implementation` before considering work complete
- Sync tokens periodically with `/sync-tokens`

### Context Files

- Keep `design-system.md` updated as tokens are added
- Reference `workflow.md` for process guidance
- Use `shopify-theme.md` for technical reference

### Code Quality

- Follow rules defined in `config.json`
- Use CSS variables from design system
- Write semantic, accessible HTML
- Keep Liquid logic minimal
- Add comprehensive schema settings

## Customization

### Adding New Context

Create new `.md` files in `context/` and reference them in `config.json`:

```json
"contextFiles": [
  ".claude/context/shopify-theme.md",
  ".claude/context/your-new-context.md"
]
```

### Adding New Skills

Create `.skill.md` files in `skills/` directory following the existing format.

### Adding Rules

Update `rules` array in `config.json`:

```json
"rules": [
  "Your new rule here",
  "Another project guideline"
]
```

## Environment Variables

### Required

- `FIGMA_ACCESS_TOKEN`: For Figma MCP integration (configured separately)

### Optional

- Any theme-specific environment variables

## Troubleshooting

### Figma MCP Not Working

- Verify Figma MCP is configured in your local Claude Code settings
- Check `FIGMA_ACCESS_TOKEN` is set
- Ensure you have access to the Figma file

### Skills Not Loading

- Verify `.skill.md` files are in `skills/` directory
- Check file naming follows pattern: `skill-name.skill.md`
- Restart Claude Code if needed

### Context Not Loading

- Verify files exist in `context/` directory
- Check `contextFiles` paths in `config.json`
- Ensure markdown syntax is valid

## Maintenance

### Regular Updates

- Update design tokens when Figma design changes
- Keep workflow documentation current
- Add new skills as workflow needs evolve
- Review and clean up unused context

### Version Control

- Commit `.claude/` directory to git
- Share configuration with team
- Document major changes to workflow

## Resources

### Shopify Theme Development

- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Theme Architecture](https://shopify.dev/docs/themes/architecture)

### Claude Code

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [MCP Documentation](https://modelcontextprotocol.io)
- [Skills Guide](https://docs.anthropic.com/claude-code/skills)

## Support

For issues or questions:

- Review this README
- Check context files for guidance
- Consult Shopify documentation
- Review skill instructions

---

**Project**: Bassface Theme 2026
**Last Updated**: 2026-01-13
**Claude Code Version**: Latest
