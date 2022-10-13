module.exports = {
    extends: 'xo-react',
    space: true,
    envs: ["es2021", "browser"],
    prettier: true,
    ignores: ['events.ts'],
    rules: {
      // The react useCallback hook would remove the need for this, however, it makes the code a bit uglier
      "react/jsx-no-bind": ['error', {allowFunctions: true, allowArrowFunctions: true}]
    },
    overrides: [
        {
          // Match js, ts, jsx, and tsx
          files: "**/*.[tj]s{,x}",
          rules: {
            "import/extensions": "off",
            "n/file-extension-in-import": "off",
            "react/no-unknown-property": ['error', { ignore: ['xl', 'lg'] }]
      },
        },
      ],
}