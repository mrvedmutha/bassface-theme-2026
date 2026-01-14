---
trigger: model_decision
description: how to version control using git
---

# Git Workflow & Deployment

**Version control and deployment process.**

---

## What to Track

**Include in git:**
- All Liquid files (`sections/`, `snippets/`, `blocks/`)
- All CSS/JS files (`assets/`)
- Config files (`config/`)
- Test files (`tests/`)
- Test configuration (`playwright.config.js`)
- Documentation (`docs/`)
- Package files (`package.json`, `package-lock.json`)

**Exclude from git:**
- `.shopify/` folder
- `prototype/` folder
- `node_modules/`
- Test results (`test-results/`, `playwright-report/`)
- OS files (`.DS_Store`)

---

## .gitignore

```
# Shopify CLI
.shopify/

# Prototypes (local development only)
prototype/

# Node modules
node_modules/

# Test results
test-results/
playwright-report/
tests/screenshots/liquid/

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
```

---

## Commit Workflow

### Before Committing

1. **Run all tests:**
   ```bash
   npm test
   ```

2. **Verify tests pass:**
   - All Playwright tests green
   - No visual regressions
   - No console errors

3. **Code review checklist:**
   - [ ] BEM methodology used
   - [ ] File naming conventions followed
   - [ ] No core theme files modified
   - [ ] No console.log without TODO
   - [ ] Code is clean and readable

---

### Commit Process

```bash
# Check status
git status

# Add files
git add sections/custom-section-header.liquid
git add assets/section-header.css
git add assets/section-header.js
git add tests/liquid/section-header/

# Or add all changes
git add .

# Commit with clear message
git commit -m "[Feature] Add custom header section with mobile menu and tests"

# Push to remote
git push origin main
```

---

## Commit Message Format

```
[Type] Description
```

### Types

- `[Feature]` - New section/snippet/block
- `[Fix]` - Bug fixes
- `[Style]` - CSS/design updates
- `[Refactor]` - Code restructuring
- `[Test]` - Adding/updating tests
- `[Docs]` - Documentation
- `[Setup]` - Project configuration

### Examples

```
[Feature] Add custom header section with tests
[Fix] Resolve mobile menu overflow issue on small screens
[Style] Update product card spacing and hover effects
[Refactor] Reorganize CSS structure using BEM methodology
[Test] Add visual regression tests for header section
[Docs] Update development rules for direct Liquid approach
[Setup] Initialize Playwright testing environment
```

---

## Shopify Theme Deployment

### Development Workflow

```bash
# Start local dev server
shopify theme dev

# Opens at http://localhost:9292
# Live reload enabled
# Test in browser while developing
```

---

### Push to Unpublished Theme (Testing)

```bash
# Push to new unpublished theme
shopify theme push --unpublished

# Or push to specific theme
shopify theme push --theme [theme-id]
```

**Always test on unpublished theme first.**

---

### Push to Live Theme (Production)

```bash
# List themes
shopify theme list

# Push to live theme (after approval)
shopify theme push --theme [live-theme-id]

# Or allow selection
shopify theme push
```

**Only push to live after:**
- All tests pass
- Manual testing complete
- Client approval received

---

## Branching Strategy (Optional)

### Simple Workflow (Recommended)

Work directly on `main` branch for small team/solo work.

```bash
git add .
git commit -m "[Feature] Add header section"
git push origin main
```

---

### Feature Branch Workflow

For larger teams:

```bash
# Create feature branch
git checkout -b feature/custom-header

# Work on feature
git add .
git commit -m "[Feature] Add header section"

# Push branch
git push origin feature/custom-header

# Merge to main (after testing)
git checkout main
git merge feature/custom-header
git push origin main

# Delete branch
git branch -d feature/custom-header
```

---

## Feature Branch Workflow Example

To keep your work organized and track both major and minor changes, use a feature-branch workflow. This lets you develop new sections or features in isolation, review changes, and merge them into `main` when ready.

### Steps
1. **Start from main branch**
   - Checkout `main` and pull latest changes:  
     `git checkout main && git pull`
2. **Create a feature branch**
   - Name it after your feature, e.g. `feature/new-section-header`:  
     `git checkout -b feature/new-section-header`
3. **Work and commit regularly**
   - Make changes, commit often (even minute changes):  
     `git add . && git commit -m "Initial header section"`  
     `git commit -m "Minor fix: logo alignment"`
4. **Push feature branch to remote**
   - `git push origin feature/new-section-header`
5. **Review and finalize**
   - When feature is done, make final commits in the feature branch.
6. **Merge feature branch into main**
   - Checkout `main`, pull, then merge:  
     `git checkout main && git pull`  
     `git merge feature/new-section-header`
   - Push to remote:  
     `git push origin main`
7. **Delete feature branch (optional)**
   - Locally: `git branch -d feature/new-section-header`  
   - Remotely: `git push origin --delete feature/new-section-header`

### Further Considerations
1. Use descriptive branch names for clarity (`feature/section-name`, `fix/header-logo`).
2. Commit small, logical changes with clear messages.
3. Always pull latest `main` before starting a new feature branch.
4. Use pull requests for code review if collaborating.

---

## Version Tags (Optional)

```bash
# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# List tags
git tag -l

# Checkout tag
git checkout v1.0.0
```

---

## Rollback Strategy

### Revert Last Commit

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Revert to Specific Commit

```bash
# Find commit hash
git log --oneline

# Revert to commit
git revert [commit-hash]
```

### Shopify Theme Rollback

```bash
# Pull previous version from Shopify
shopify theme pull --theme [theme-id]

# Or restore from git
git checkout [commit-hash] -- sections/custom-section-header.liquid
git commit -m "[Fix] Rollback header to previous version"
shopify theme push
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass (`npm test`)
- [ ] No console errors in browser
- [ ] Tested on Chrome, Firefox
- [ ] Tested all breakpoints (1441px+, 1440px, 1024px, 767px, 375px)
- [ ] Section works in theme editor
- [ ] Git commit created with clear message
- [ ] Code reviewed

### Push to Unpublished

- [ ] Run `shopify theme push --unpublished`
- [ ] Test on unpublished theme
- [ ] Verify all functionality works
- [ ] Get client approval (if needed)

### Push to Live

- [ ] Final manual testing
- [ ] Backup current live theme (download)
- [ ] Run `shopify theme push --theme [live-theme-id]`
- [ ] Verify live site works
- [ ] Monitor for errors

---

## Common Git Commands

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log --oneline

# Discard changes in file
git checkout -- [file-path]

# Unstage file
git reset HEAD [file-path]

# View remote URL
git remote -v

# Pull latest changes
git pull origin main

# Stash changes temporarily
git stash
git stash pop

# View branches
git branch -a

# Delete branch
git branch -d [branch-name]
```

---

## Shopify CLI Commands

```bash
# Login to Shopify
shopify auth login

# List themes
shopify theme list

# Pull theme from Shopify
shopify theme pull --theme [theme-id]

# Push theme to Shopify
shopify theme push --theme [theme-id]

# Start dev server
shopify theme dev

# Check theme for issues
shopify theme check

# Open theme editor
shopify theme open
```

---

## Troubleshooting

### Merge Conflicts

```bash
# View conflicts
git status

# Manually resolve conflicts in files
# Look for <<<<<<< HEAD markers

# After resolving
git add [resolved-files]
git commit -m "Resolve merge conflicts"
```

### Accidental Commit

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Make corrections
git add .
git commit -m "[Fix] Corrected commit message"
```

### Push Rejected

```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts if any
# Then push
git push origin main
```

---

## Best Practices

- **Commit frequently** - Small, focused commits
- **Clear messages** - Descriptive commit messages
- **Test before commit** - All tests must pass
- **Never commit secrets** - No API keys, passwords
- **Pull before push** - Avoid conflicts
- **Backup before deploy** - Download live theme
- **Test on unpublished first** - Never deploy directly to live
