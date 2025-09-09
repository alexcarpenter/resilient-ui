import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    nftTracing: true,
  },
}

export default withMDX(config)
