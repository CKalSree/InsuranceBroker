# Hooks

Claude Code hooks are configured in supported settings files, typically `.claude/settings.json` or user settings. This folder is a place to keep scripts you choose to call from hooks; the folder itself does not automatically register hooks.

Before adding a hook:
1. Check the current Claude Code hooks documentation and event schema.
2. Use a script that exists in this repository.
3. Keep the hook narrowly scoped and safe.
4. Test it manually before enabling it.
5. Avoid hooks that make external writes or destructive changes without safeguards.
