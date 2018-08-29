const shell = require("shelljs")

shell.echo("Building components...");
shell.rm("-rf", "dist");
const exitCode = shell.exec("tsc -p tsconfig.prod.json").code

if (exitCode) {
    shell.echo("Error: tsc exited with exit code " + exitCode);
    process.exit(exitCode);
}

shell.echo("Copying package.json to /dist");
shell.cp("package.json", "dist/package.json");
shell.echo("Copying README.md to /dist");
shell.cp("README.md", "dist/README.md");
shell.cd("dist");
const generatedFiles = shell.ls();

shell.echo("Packing the module");
const filename = shell.exec("npm pack").stdout

shell.echo("Moving generated files...")
shell.mkdir("generated");
shell.mv(generatedFiles, "generated")

shell.echo("Done. The packaged module can be found at dist/" + filename)