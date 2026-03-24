# Product Management Examples

## Example 1: PRD for a new feature

```markdown
# PRD: Advanced Search Functionality

## Problem Statement
Users frequently report difficulty finding specific items in our catalog when they have multiple criteria (price range, location, category, features). Our current search only supports simple text queries, leading to:
- High bounce rates on search results pages (65% bounce rate vs 32% site average)
- Increased support tickets asking for search help (150/month)
- Lost conversion opportunities (estimated $500K annual revenue impact)

## Goals and Success Metrics
**Primary Goal**: Enable users to find relevant items quickly using multiple filters.

**Success Metrics**:
- Reduce search result page bounce rate from 65% to <40%
- Increase search-to-purchase conversion rate by 25%
- Reduce search-related support tickets by 50%
- 70% of users engage with at least one filter within 30 days

## User Stories

### Must Have
1. As a buyer, I want to filter by price range so I can find items within my budget
2. As a buyer, I want to filter by location so I can find items near me
3. As a buyer, I want to filter by category so I can narrow down item types
4. As a buyer, I want to combine multiple filters so I can find exactly what I need
5. As a buyer, I want to see filter counts so I know how many items match before applying

### Should Have
6. As a buyer, I want to save my filter preferences so I don't have to reapply them
7. As a buyer, I want to see suggested filters based on my search query
8. As a buyer, I want to sort filtered results by relevance, price, or date

### Nice to Have
9. As a buyer, I want to create saved searches that notify me of new matches
10. As a buyer, I want to share a filtered search URL with others
```

## Example 2: Feature request analysis

```markdown
# Feature Analysis: Dark Mode Support

## Request Summary
**Source**: User feedback (150+ requests in past 6 months), competitive pressure
**Description**: Add dark mode theme option to web and mobile apps

## User Need
Users working in low-light environments report eye strain with current light-only theme. Power users (25% of DAU) spend 3+ hours/day in app and strongly prefer dark mode.

## Prioritization Score

Using RICE framework:
- **Reach**: 750K users = 750
- **Impact**: 8/10 (high for target segment) = 0.8
- **Confidence**: 85% = 0.85
- **Effort**: 7 weeks = 7

**RICE Score**: (750 × 0.8 × 0.85) / 7 = **73.2**

## Recommendation

**Proceed with Option 1 (Full Dark Mode)**

**Reasoning**:
- High impact for large user segment (45% of base)
- Strong user demand and competitive pressure
- Effort is reasonable relative to value
- RICE score above our threshold (>50)
- Aligns with product, technical, and business strategy
```

## Example 3: User Research Synthesis

```markdown
# Research Synthesis: Onboarding Experience

## Overview
- **Method**: 12 user interviews + 500 survey responses
- **Participants**: New users in first 30 days
- **Focus**: Understanding onboarding friction points

## Key Themes

### 1. Information Overload (9/12 interviews)
> "There's just too much to learn at once. I felt overwhelmed."
- Users want guided, progressive disclosure
- Current approach dumps all features at once

### 2. Unclear Value Proposition (7/12 interviews)
> "I signed up but wasn't sure what to do first."
- Users need clear "aha moment" guidance
- Successful users found core value within 5 minutes

### 3. Missing Context (6/12 interviews)
> "I didn't know why I needed to set this up."
- Steps lack explanation of benefits
- Users skip important setup without understanding consequences

## Recommendations
1. **Priority 1**: Implement progressive onboarding with clear milestones
2. **Priority 2**: Add contextual help explaining "why" for each step
3. **Priority 3**: Create personalized paths based on user goals
```

## Example 4: Roadmap Theme

```markdown
# Q2 Roadmap: Search & Discovery

## Theme: Help users find what they need faster

### Now (This Sprint)
- [ ] Basic filter UI for price and category
- [ ] Search result count display
- [ ] Mobile-responsive filter panel

### Next (Next 2 Sprints)
- [ ] Location-based filtering
- [ ] Saved filter preferences
- [ ] Filter suggestions based on query

### Later (This Quarter)
- [ ] Saved searches with notifications
- [ ] AI-powered search recommendations
- [ ] Advanced boolean search operators

## Success Criteria
- Search-to-conversion rate increases 25%
- Search bounce rate decreases to <40%
- NPS for search experience >40
```
