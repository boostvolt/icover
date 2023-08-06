# Code of Conduct

## Conventional Commits

Developers should use the Conventional Commits standard when committing changes to the codebase.

| Type     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| feat     | Declares a new feature has been added                                 |
| fix      | Declares a bug have been fixed                                        |
| chore    | Declares changes which don’t modify source or test files (eg. assets) |
| ci       | Declares a change on the CI or CD process                             |
| build    | Declares changes on the build setup                                   |
| docs     | Declares changes on documentation                                     |
| style    | Declares changes on code style                                        |
| refactor | Declares a change of code without an effective change on the program  |
| perf     | Declares a change on performance                                      |
| revert   | Declares that a previous commit has been reverted                     |
| test     | Declares changes on tests                                             |

### Examples

#### Commit Message

```
refactor: adjust vehicle texture size [#ISSUENUMBER]
refactor: adjust vehicle texture size [NOISSUE]
```

#### Branch Name

```
refactor/#ISSUENUMBER_adjust-vehicle-texture-size
refactor/NOISSUE_adjust-vehicle-texture-size
```

## Contributing

Developers should follow the following guidelines when contributing to the project:

### 1. Create a new branch

When starting work on a new feature or bug fix, create a new branch from the `main` branch. The name
of the branch should be descriptive and should include the issue number and a short description of
the feature or bug fix. For example, if you are working on issue #123, the branch name should
be `feat/#123_add-new-feature`.

### 2. Commit changes

When committing changes to the codebase, developers should follow
the [Conventional Commits](#conventional-commits) standard. This will ensure that the commit
messages are consistent and descriptive, and will allow the commit history to be automatically
parsed to generate release notes.

### 3. Create a draft pull request

After committing changes to the codebase, create a draft pull request to inform other developers
that you are working on a new feature or bug fix. The pull request should be kept in draft mode
until the feature or bug fix is complete.

### 4. Create a pull request

When the feature or bug fix is complete, mark the pull request as ready to review to merge the
changes into the `main` branch. The pull request should be reviewed by at least one other developer
before it can be merged.

### 5. Review pull request

When a pull request is marked as ready for review, it should be reviewed by at least one other
developer. The reviewer should verify that the code meets
the [Definition of Done](#definition-of-done).

### 6. Merge pull request

Once the pull request has been reviewed and approved, it can be merged into the `main` branch. The
pull request should be merged using the "Rebase and merge" option to ensure that the commit history
remains clean and concise.

## Definition of Done

### 1. Code meets coding standards

All code must adhere to the rules defined in the Clean Code handbook for at least level L1. Level L2
rules should also be taken into consideration. Specifically, emphasis should be placed on:

1. Correct abstraction level: The code should have a clear and appropriate level of abstraction,
   with well-defined interfaces and separation of concerns.
2. Class diagram: The class diagram should be clear and well-organized, with high cohesion and low
   coupling between classes.
3. Correct error handling: The code should handle errors correctly, including validating arguments
   and handling exceptions in a consistent and appropriate manner.

### 2. Unit tests pass

All code changes must be accompanied by unit tests that verify the expected behavior of the code.
These tests must pass without any errors or failures before the code can be considered complete.

### 3. Code is reviewed

All code must be reviewed by at least one other developer to ensure quality and compliance with
coding standards. The code review should focus on identifying any bugs, security vulnerabilities, or
design flaws that could impact the quality or maintainability of the code.

### 4. Documentation is complete

All code must be fully documented, including comments within the code and external documentation
such as user manuals. The documentation should be comprehensive and accurate, and should provide
enough detail for other developers and stakeholders to understand the code.

### 5. Acceptance criteria are met

The code must meet all of the acceptance criteria as defined by the stakeholders. These acceptance
criteria are used as a basis for verifying that the code meets the intended requirements

### 6. Security is considered

The code must be reviewed for security vulnerabilities and any identified issues must be addressed.
The code should be designed with security in mind, and should be subject to regular security testing
to identify any new vulnerabilities.