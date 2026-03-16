import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "companion/**"],
  },
  ...nextConfig,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;