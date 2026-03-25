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

---

## Agent-Based Workflow

You use specialized agents to handle complex phases of section development. Each agent runs in its own context window to keep the main conversation clean.

### Trigger Detection & Agent Invocation

**CRITICAL: You MUST use the Agent tool to spawn agents. Do not just describe what should happen.**

**User provides Figma URL or design:**
```
1. Read `.claude/agents/analyzer.md`
2. Invoke Agent tool:
   - description: "Analyze Figma design"
   - prompt: "Read and follow .claude/agents/analyzer.md. Figma URL: [user-provided-url]"
   - subagent_type: "general-purpose"
```

**Analysis complete, user confirms:**
```
1. Read `.claude/agents/planner.md`
2. Invoke Agent tool:
   - description: "Create implementation plan"
   - prompt: "Read and follow .claude/agents/planner.md. Use design-analysis.json from docs/[section-name]/"
   - subagent_type: "Plan"
```

**Planning complete, user confirms:**
```
1. Read `.claude/agents/developer.md`
2. Invoke Agent tool:
   - description: "Implement section code"
   - prompt: "Read and follow .claude/agents/developer.md. Use planning docs from docs/[section-name]/"
   - subagent_type: "general-purpose"
```

**Development complete:**
```
1. Read `.claude/agents/validator.md`
2. Invoke Agent tool:
   - description: "Validate implementation"
   - prompt: "Read and follow .claude/agents/validator.md. Validate files in sections/ and assets/"
   - subagent_type: "general-purpose"
```

**Validation passed:**
```
1. Read `.claude/agents/tester.md`
2. Invoke Agent tool:
   - description: "Run tests"
   - prompt: "Read and follow .claude/agents/tester.md. Test section at localhost:9292"
   - subagent_type: "general-purpose"
```

**Tests failed:**
```
1. Read `.claude/agents/fixer.md`
2. Invoke Agent tool:
   - description: "Fix test failures"
   - prompt: "Read and follow .claude/agents/fixer.md. Use test-results.json from docs/[section-name]/tests/"
   - subagent_type: "general-purpose"
   - (max 3 attempts)
```

### Agent Interaction

Agents can directly ask users questions using AskUserQuestion tool. The flow:
```
You → Spawn agent → Agent works → Agent asks user → User answers → Agent continues → Returns results to you
```

### State Management

Track progress in `docs/[section-name]/state.json`:

```json
{
  "section_name": "hero-video",
  "current_phase": "development",
  "status": "in_progress",
  "phases_completed": ["analysis", "planning"],
  "next_agent": "validator"
}
```

**On "continue" command:** Read state.json → Resume from current phase

### Pipeline Flow

```
Figma URL → ANALYZER agent → user confirms
→ PLANNER agent → user confirms
→ DEVELOPER agent → VALIDATOR agent
→ TESTER agent → [PASS: Done | FAIL: FIXER agent (3x)]
```

### File Structure

```
docs/[section-name]/
├── state.json
├── design-analysis.json
├── figma/README.md
├── 01-overview.md
├── 02-design-tokens.md
├── 03-implementation.md
└── tests/
    └── test-results.json
```

### Breakpoints

```css
/* Base: 1440px */
@media (min-width: 1441px) { max-width: 1440px; margin: 0 auto; }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 767px)  { /* Mobile */ }
@media (max-width: 375px)  { /* Small mobile */ }
```

### Core Rules

1. Only create `custom-section-*` files (never modify core theme)
2. Always read agent guide before spawning
3. Update `state.json` after each phase
4. Let agents handle user interaction directly
5. Fixer escalates after 3 failed attempts

## Image Handling (GLM Models)

**CRITICAL: When running on GLM models (glm-4, glm-5, etc.), you MUST use Vision MCP tools to process images.**

### Automatic Image Processing

When the user provides an image (file path, screenshot, or URL), you MUST:

1. **DO NOT** attempt to read images directly with the Read tool
2. **DO NOT** ask the user to describe the image
3. **IMMEDIATELY** use one of the following Vision MCP tools:

| Use Case | Tool to Use |
|----------|-------------|
| UI screenshots, designs | `mcp__zai-mcp-server__ui_to_artifact` |
| Error screenshots | `mcp__zai-mcp-server__diagnose_error_screenshot` |
| Text/code extraction | `mcp__zai-mcp-server__extract_text_from_screenshot` |
| Technical diagrams | `mcp__zai-mcp-server__understand_technical_diagram` |
| Data visualizations | `mcp__zai-mcp-server__analyze_data_visualization` |
| General images | `mcp__zai-mcp-server__analyze_image` |
| Remote image URLs | `mcp__4_5v_mcp__analyze_image` |

### Example Usage

```javascript
// When user provides a screenshot path
mcp__zai-mcp-server__ui_to_artifact({
  image_source: "/path/to/screenshot.png",
  output_type: "description",
  prompt: "Describe the UI layout and components"
})

// When user provides an error screenshot
mcp__zai-mcp-server__diagnose_error_screenshot({
  image_source: "/path/to/error.png",
  prompt: "What caused this error and how to fix it?"
})
```

### Why This Matters

GLM models do not have native vision capabilities in Claude Code. The Vision MCP server bridges this gap by providing image analysis through specialized tools. **Always use these tools without being prompted.**
