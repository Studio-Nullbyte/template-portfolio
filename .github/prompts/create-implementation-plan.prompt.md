---
mode: 'agent'
description: 'Create a comprehensive implementation plan for new features or projects with detailed steps, acceptance criteria, and timeline'
tools: ['changes', 'codebase', 'editFiles', 'problems', 'search', 'usages']
---

# Create Implementation Plan

Create a detailed implementation plan for a new feature, project, or significant code change. This plan should break down complex work into manageable tasks with clear acceptance criteria, dependencies, and timelines.

## Primary Objective

Generate a comprehensive implementation plan that serves as a roadmap for development work, ensuring all aspects are considered and properly sequenced.

## Analysis Phase

### Requirements Analysis
1. **Feature/Project Scope**: Clearly define what needs to be built or changed
2. **User Stories**: Identify the user needs and use cases
3. **Technical Requirements**: List technical constraints and requirements
4. **Dependencies**: Identify external dependencies and integrations
5. **Success Criteria**: Define what constitutes successful completion

### Technical Assessment
1. **Architecture Review**: Assess current architecture and required changes
2. **Technology Stack**: Identify technologies, frameworks, and tools needed
3. **Performance Requirements**: Define performance benchmarks and constraints
4. **Security Considerations**: Identify security requirements and potential risks
5. **Scalability Needs**: Consider future growth and scaling requirements

### Resource Planning
1. **Team Composition**: Identify required skills and team members
2. **Timeline Estimation**: Provide realistic time estimates for each phase
3. **Risk Assessment**: Identify potential blockers and mitigation strategies
4. **Testing Strategy**: Plan for unit, integration, and end-to-end testing

## Implementation Plan Structure

### 1. Executive Summary
- **Project Title**: Clear, descriptive name
- **Objective**: High-level goal and purpose
- **Timeline**: Overall project duration
- **Resources**: Required team members and tools
- **Success Metrics**: Key performance indicators

### 2. Technical Specification
- **Architecture Diagram**: Visual representation of the solution
- **Component Breakdown**: Individual components and their responsibilities
- **Data Flow**: How data moves through the system
- **Integration Points**: External APIs and services
- **Technology Decisions**: Justification for technology choices

### 3. Development Phases

#### Phase 1: Foundation and Setup
- Set up development environment
- Configure build and deployment pipelines
- Establish coding standards and guidelines
- Create project structure and base components

#### Phase 2: Core Development
- Implement main functionality
- Build core components and features
- Integrate with external services
- Add error handling and validation

#### Phase 3: Integration and Testing
- Integration testing
- Performance optimization
- Security testing and hardening
- User acceptance testing

#### Phase 4: Deployment and Launch
- Production deployment
- Monitoring and logging setup
- Documentation and training
- Post-launch support plan

### 4. Detailed Task Breakdown

For each phase, provide:
- **Task Description**: Clear, actionable task
- **Acceptance Criteria**: Specific, measurable outcomes
- **Dependencies**: What must be completed first
- **Estimated Effort**: Time estimate in hours/days
- **Assigned To**: Team member or role responsible
- **Priority**: High/Medium/Low priority

### 5. Risk Management
- **Risk Identification**: Potential issues and blockers
- **Impact Assessment**: Severity and likelihood of each risk
- **Mitigation Strategies**: Plans to prevent or address risks
- **Contingency Plans**: Alternative approaches if primary plan fails

### 6. Quality Assurance
- **Testing Strategy**: Unit, integration, and E2E testing approach
- **Code Review Process**: Peer review guidelines and checklist
- **Performance Benchmarks**: Expected performance metrics
- **Security Checklist**: Security validation requirements

### 7. Documentation Plan
- **Technical Documentation**: API docs, architecture guides
- **User Documentation**: User guides and tutorials
- **Deployment Documentation**: Setup and configuration guides
- **Maintenance Documentation**: Troubleshooting and support guides

## Output Format

```markdown
# Implementation Plan: [Project Title]

## Executive Summary
**Objective**: [Clear project goal]
**Timeline**: [Start date] - [End date] ([X] weeks)
**Team**: [Required roles and people]
**Success Metrics**: [Key performance indicators]

## Technical Specification

### Architecture Overview
[High-level architecture description]

### Technology Stack
- **Frontend**: [Technologies]
- **Backend**: [Technologies]
- **Database**: [Technologies]
- **Infrastructure**: [Technologies]

### Component Breakdown
1. **[Component 1]**: [Description and responsibilities]
2. **[Component 2]**: [Description and responsibilities]
3. **[Component 3]**: [Description and responsibilities]

## Development Phases

### Phase 1: Foundation ([X] days)
**Objective**: [Phase objective]

#### Tasks
- [ ] **[Task 1]**
  - **Description**: [Detailed task description]
  - **Acceptance Criteria**: [Specific outcomes]
  - **Estimated Effort**: [X] hours
  - **Dependencies**: [Prerequisites]
  - **Assigned To**: [Team member]

- [ ] **[Task 2]**
  - **Description**: [Detailed task description]
  - **Acceptance Criteria**: [Specific outcomes]
  - **Estimated Effort**: [X] hours
  - **Dependencies**: [Prerequisites]
  - **Assigned To**: [Team member]

### Phase 2: Core Development ([X] days)
[Similar structure for each phase]

### Phase 3: Integration and Testing ([X] days)
[Similar structure for each phase]

### Phase 4: Deployment and Launch ([X] days)
[Similar structure for each phase]

## Risk Management

| Risk | Impact | Likelihood | Mitigation | Contingency |
|------|--------|------------|------------|-------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Prevention strategy] | [Backup plan] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Prevention strategy] | [Backup plan] |

## Quality Assurance

### Testing Strategy
- **Unit Testing**: [Coverage goals and tools]
- **Integration Testing**: [Approach and tools]
- **E2E Testing**: [Scenarios and tools]
- **Performance Testing**: [Benchmarks and tools]

### Code Quality
- **Code Review**: [Process and checklist]
- **Static Analysis**: [Tools and rules]
- **Documentation**: [Standards and requirements]

## Documentation Deliverables
- [ ] Technical architecture documentation
- [ ] API documentation
- [ ] User guides and tutorials
- [ ] Deployment and configuration guides
- [ ] Troubleshooting documentation

## Success Criteria
- [ ] All acceptance criteria met
- [ ] Performance benchmarks achieved
- [ ] Security requirements satisfied
- [ ] Documentation completed
- [ ] User acceptance achieved

## Timeline Summary
| Phase | Start Date | End Date | Duration | Dependencies |
|-------|------------|----------|----------|--------------|
| Phase 1 | [Date] | [Date] | [X] days | None |
| Phase 2 | [Date] | [Date] | [X] days | Phase 1 |
| Phase 3 | [Date] | [Date] | [X] days | Phase 2 |
| Phase 4 | [Date] | [Date] | [X] days | Phase 3 |

**Total Project Duration**: [X] weeks
```

## Validation Checklist

- [ ] All requirements clearly defined
- [ ] Tasks are specific and actionable
- [ ] Acceptance criteria are measurable
- [ ] Dependencies are identified
- [ ] Timeline is realistic
- [ ] Risks are assessed and mitigated
- [ ] Quality assurance plan is comprehensive
- [ ] Documentation requirements are defined
- [ ] Success criteria are clear and achievable
