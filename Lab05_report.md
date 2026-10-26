# Lab 05 — Builds, Dependencies and Versioned Artifacts

**Student Name:** Amina Asif  
**Roll Number:** 23-NTU-CS-1136  
**Package:** `@mahaather15/devops-pipeline`  
**Version:** `1.1.0`

## 9.1 Report Answers

### 1. Declared and Installed Packages

The project declares **2 direct dependencies**: `js-yaml` and `markdown-it`.

The dependency tree contains **9 installed dependency packages**, excluding the root project.

Output of `npm ls --all`:

```text
@mahaather15/devops-pipeline@1.1.0 /home/amina/devops/lab05
├─┬ js-yaml@4.3.2
│ └── argparse@2.0.1
└─┬ markdown-it@15.0.3
  ├── argparse@3.0.3
  ├── entities@8.1.0
  ├─┬ linkify-it@6.1.0
  │ └── uc.micro@3.0.0 deduped
  ├── mdurl@2.1.0
  ├── punycode.js@2.3.1
  └── uc.micro@3.0.0
```

### 2. Deduped Dependency

The deduped line is:

```text
│     └── uc.micro@3.0.0 deduped
```

The `deduped` label means npm reuses a compatible dependency version that is already installed elsewhere in the dependency tree. This avoids installing an unnecessary duplicate copy and helps reduce the dependency tree size.

### 3. Meaning of `^15.0.3`

The version range `^15.0.3` permits compatible versions starting from `15.0.3` but below `16.0.0`.

It allows compatible minor and patch updates but does not allow version `16.0.0` or higher. If dependency versions are resolved differently on different installations, builds may not be identical. A committed lockfile helps preserve the resolved versions and improve reproducibility.

### 4. Lockfile and Hashes

The `package-lock.json` records exact resolved dependency versions and package integrity information. It also records dependency relationships and helps npm reproduce the dependency installation.

Two identical SHA-256 hashes recorded for `package-lock.json` are:

**First hash:**

```text
f7ebac4fab04e3dafb43ef1962ccc2d4032a3f7b145bdef5a731072d2cfc1c52
```

**Second hash:**

```text
f7ebac4fab04e3dafb43ef1962ccc2d4032a3f7b145bdef5a731072d2cfc1c52
```

The matching hashes indicate that the file contents were identical when these two checks were performed.

### 5. `npm ci` Refusal — Task 6.4

During Task 6.4, `npm ci` refused to proceed because `package.json` and `package-lock.json` were not synchronized.

The original error included:

```text
npm ERR! code EUSAGE
npm ERR! `npm ci` can only install packages when your package.json and package-lock.json are in sync.
npm ERR! Missing: js-yaml@4.3.2 from lock file
npm ERR! Missing: argparse@2.0.1 from lock file
```

This refusal is desirable because `npm ci` requires the manifest and lockfile to agree. It prevents an installation from proceeding with an inconsistent dependency definition and supports reproducible builds.

After synchronizing the lockfile, `npm ci` completed successfully:

```text
added 9 packages, and audited 10 packages in 860ms

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 6. Version Choice — Task 7.1

The selected package version is `1.1.0`.

This version was used for the packaged build artifact. The package was successfully packed locally as `mahaather15-devops-pipeline-1.1.0.tgz`.

**Rejected version alternatives:** The exact alternatives selected in Task 7.1 are not available in the recorded terminal output, so they are not stated here.

### 7. Artifact Contents

**Artifact filename:** `mahaather15-devops-pipeline-1.1.0.tgz`

The `npm pack` command generated the following artifact contents:

```text
package/tools/build.js
package/package.json
package/README.md
```

The archive contains three intentional files:

- `package/tools/build.js` contains the Markdown-to-HTML build tool.
- `package/package.json` contains the package metadata, entry points, and dependency declarations.
- `package/README.md` documents the project requirements, installation, usage, and available commands.

The archive was checked using `tar -tzf`, and all three expected files were present.

The `npm pack` output reported:

```text
npm notice name:          @mahaather15/devops-pipeline
npm notice version:       1.1.0
npm notice filename:      mahaather15-devops-pipeline-1.1.0.tgz
npm notice total files:   3
```

### 8. Broken Artifact — Task 7.5

The broken artifact was tested in a separate directory at `/tmp/lab05-bad`.

The resulting dependency tree was:

    lab05-bad@1.0.0 /tmp/lab05-bad
    └── @mahaather15/devops-pipeline@1.1.0

Running the command-line build tool produced this error:

    Error: Cannot find module 'markdown-it'
    code: 'MODULE_NOT_FOUND'

The failure occurred because `markdown-it` was placed in `devDependencies` in the deliberately broken package instead of being declared as a runtime dependency. Consequently, the consumer installation did not provide `markdown-it`, which the build tool requires at runtime.

The test demonstrates why packages needed during normal execution must be declared in `dependencies`.

### 9. Package Publishing Status

**Package:** `@MahaAther22/devops-pipeline`
**Version:** `1.1.0`

Publishing to GitHub Packages was attempted but failed with `E403 permission_denied: create_package`.

The reported error was:

    npm ERR! code E403
    403 Forbidden - PUT https://npm.pkg.github.com/@mahaather15%2fdevops-pipeline
    Permission permission_denied: create_package

Because publication to GitHub Packages was unsuccessful, the GitHub Release fallback was used.

A release named **DevOps Pipeline v1.1.0** was successfully created with tag `v1.1.0`, targeting the `main` branch. The packaged artifact `MahaAther22-devops-pipeline-1.1.0.tgz` was attached to the release.

**GitHub Packages status:** Publishing attempted but failed with an E403 permission error.

**GitHub Release fallback status:** Successfully completed.

**GitHub Release fallback URL:**
https://github.com/MahaAther22/FYP_repo/releases/tag/v1.1.0

### 10. Lab 02 Files and Fallback

The lab work uses the project `Makefile`, Markdown source files, build tool, and test files in the `lab05` directory.

The source files are:

    src/greeting.md
    src/notes.md
    src/services.md

The test file is:

    test/build.test.js

The GitHub Release fallback was successfully completed for version `v1.1.0`, and the packaged `.tgz` artifact was attached to the release.
