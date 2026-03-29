#!/usr/bin/env node

import { Command } from "commander";
import { spineList, spineInstall } from "./commands/spine.js";

const program = new Command();

program
  .name("p0")
  .description("Project0 CLI — spine installation and deployment")
  .version("0.1.0");

const spine = program
  .command("spine")
  .description("Manage deployable architecture stacks");

spine.command("list").description("List available spines").action(spineList);

spine
  .command("install <name>")
  .description("Install a spine (e.g. starter)")
  .action(spineInstall);

program.parse();
